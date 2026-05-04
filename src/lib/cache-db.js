import { prisma } from "@/lib/prisma";

export async function getMovieFromDb(movieId) {
  const movie = await prisma.movie.findUnique({
    where: {
      movieId: Number(movieId),
    },
    include: {
      director: true,
      castMembers: {
        orderBy: {
          castOrder: "asc",
        },
      },
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });

  if (!movie) return null;

    console.log(movie);

  return {
    runtime: movie.runtime,
    movieId: movie.movieId,
    name: movie.name,
    runtimeString: movie.runtimeString,
    rating: movie.rating,
    ratingCount: movie.ratingCount,
    director: movie.director?.name ?? null,
    directorId: movie.director?.id ?? null,
    plotText: movie.plotText,
    castList: movie.castMembers.map((c) => ({
      id: c.id,
      name: c.name,
      original_name: c.originalName,
      character: c.character,
      profile_path: c.profilePath,
      known_for_department: c.knownForDept,
      order: c.castOrder,
    })),
    genreList: movie.genres.map((g) => ({
      id: g.genre.id,
      name: g.genre.name,
    })),
    source: "database",
    cachedAt: movie.cachedAt,
  };
}

export async function saveMovieToDb(movieData) {
  return prisma.$transaction(async (tx) => {
    const movie = await tx.movie.upsert({
      where: {
        movieId: movieData.movieId,
      },
      update: {
        name: movieData.name,
        runtime: movieData.runtime,
        runtimeString: movieData.runtimeString,
        rating: movieData.rating,
        ratingCount: movieData.ratingCount,
        plotText: movieData.plotText,
        cachedAt: new Date(),
        director: movieData.directorId
          ? {
              connectOrCreate: {
                where: { id: movieData.directorId },
                create: {
                  id: movieData.directorId,
                  name: movieData.director ?? "Unknown",
                },
              },
            }
          : undefined,
      },
      create: {
        movieId: movieData.movieId,
        name: movieData.name,
        runtime: movieData.runtime,
        runtimeString: movieData.runtimeString,
        rating: movieData.rating,
        ratingCount: movieData.ratingCount,
        plotText: movieData.plotText,
        posterPath: movieData.posterPath,
        backdropPath: movieData.backdropPath,
        cachedAt: new Date(),
        director: movieData.directorId
          ? {
              connectOrCreate: {
                where: { id: movieData.directorId },
                create: {
                  id: movieData.directorId,
                  name: movieData.director ?? "Unknown",
                },
              },
            }
          : undefined,
      },
    });

    await tx.castMember.deleteMany({
      where: {
        movieDbId: movie.id,
      },
    });

    await tx.movieGenre.deleteMany({
      where: {
        movieDbId: movie.id,
      },
    });

    if (movieData.castList?.length) {
      await tx.castMember.createMany({
        data: movieData.castList.map((c) => ({
          id: c.id,
          movieDbId: movie.id,
          name: c.name,
          originalName: c.original_name ?? null,
          character: c.character ?? null,
          profilePath: c.profile_path ?? null,
          knownForDept: c.known_for_department ?? null,
          castOrder: c.order ?? null,
        })),
      });
    }

    for (const g of movieData.genreList ?? []) {
      await tx.genre.upsert({
        where: { id: g.id },
        update: { name: g.name },
        create: {
          id: g.id,
          name: g.name,
        },
      });

      await tx.movieGenre.create({
        data: {
          movieDbId: movie.id,
          genreId: g.id,
        },
      });
    }

    return tx.movie.findUnique({
      where: { movieId: movieData.movieId },
      include: {
        director: true,
        castMembers: {
          orderBy: {
            castOrder: "asc",
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });
  });
}