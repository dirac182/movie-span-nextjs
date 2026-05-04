import { NextResponse } from "next/server";
import { fetchMovieFromTMDB } from "@/lib/tmdb-fetch";
import { getMovieFromDb, saveMovieToDb } from "@/lib/cache-db";

export async function GET(request, { params }) {
  try {
    const {id} = await params;
    const movieId = Number(id);
    const refresh = request.nextUrl.searchParams.get("refresh") === "true";

    if (!movieId || Number.isNaN(movieId)) {
      return NextResponse.json(
        { ok: false, message: "Invalid movie id." },
        { status: 400 }
      );
    }

    async function withRetry(fn, retries = 2, delayMs = 3000) {
        let lastError;

        for (let i = 0; i <= retries; i++) {
            try {
            return await fn();
            } catch (error) {
            lastError = error;

            if (i === retries) break;

            await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }

        throw lastError;
}

    const existingMovie = await withRetry(() => getMovieFromDb(movieId));

    if (existingMovie) {
      return NextResponse.json({
        ok: true,
        source: "database",
        movie: existingMovie,
      });
    }

    if (!refresh) {
      const existingMovie = await getMovieFromDb(movieId);

      if (existingMovie) {
        return NextResponse.json({
          ok: true,
          source: "database",
          movie: existingMovie,
        });
      }
    }

    const movieData = await fetchMovieFromTMDB(movieId);
    await saveMovieToDb(movieData);

    const savedMovie = await getMovieFromDb(movieId);

    return NextResponse.json({
      ok: true,
      source: "tmdb",
      movie: savedMovie,
    });
  } catch (error) {
    console.error("MOVIE CACHE ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}