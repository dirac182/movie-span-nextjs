import dotenv from 'dotenv';
import { headers } from 'next/headers';

export async function fetchMovieFromTMDB(id) {
    const apiUrl = process.env.NEW_API_HOST;
    const apiKey = process.env.NEW_API_KEY;
    const apiSearchMovieByIdExtention = process.env.NEW_ID_MOVIE_SEARCH_URL;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
            },
    };

    const movieDetailsResults = await fetch(`${apiUrl}${apiSearchMovieByIdExtention}${encodeURIComponent(id)}`, 
        {...options, cache: "no-store"
    });

    if (!movieDetailsResults.ok){
        throw new Error(`TMDB details request faild: ${movieDetailsResults.status}`);
    }

    const movieDetails = await movieDetailsResults.json();

    const movieCreditsResults = await fetch(`${apiUrl}${apiSearchMovieByIdExtention}${encodeURIComponent(id)}/credits`,
        {...options, cache: "no-store"
    });

    if (!movieCreditsResults.ok){
        throw new Error(`TMDB details request faild: ${movieCreditsResults.status}`);
    }

    const movieCredits = await movieCreditsResults.json();

    const runtime = String(movieDetails.runtime ?? 0);
    const runtimeHour = Math.floor((movieDetails.runtime ?? 0) / 60);
    const runtimeMinute = (movieDetails.runtime ?? 0) % 60;
    const runtimeString = `${runtimeHour} Hours ${runtimeMinute} Minutes`;

    const castList = (movieCredits.cast ?? []).filter(
        (c) => c.known_for_department === "Acting" && c.order < 7
    );

    const director =
    (movieCredits.crew ?? []).find((c) => c.job === "Director") ?? null;

    return {
        runtime,
        movieId: movieDetails.id,
        name: movieDetails.original_title,
        runtimeString,
        rating: movieDetails.vote_average,
        ratingCount: movieDetails.vote_count,
        director: director?.original_name ?? null,
        directorId: director?.id ?? null,
        plotText: movieDetails.overview ?? "",
        castList,
        genreList: movieDetails.genres ?? [],
        };
    }
