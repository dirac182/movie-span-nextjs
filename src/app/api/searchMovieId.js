"use server";
import dotenv from 'dotenv';

dotenv.config();

export default async function searchMovieId(id) {

    const apiUrl = process.env.NEW_API_HOST;
    const apiSearchMovieByIdExtention = process.env.NEW_ID_MOVIE_SEARCH_URL;
    const options = {
        method: 'GET',
        headers: {
            'Authorization':` Bearer ${process.env.NEW_API_KEY}`,
            'accept': "application/json"
        }
    }

    try {
        //GET Movie Details
        const movieDetailsResponse = await fetch(`${apiUrl}${apiSearchMovieByIdExtention}${encodeURIComponent(id)}`, options);
        const movieDetails = await movieDetailsResponse.json()
        
        //Runtime 
        const runtime = (movieDetails.runtime).toString();
        const runtimeHour = Math.floor(movieDetails.runtime / 60);
        const runtimeMinute = movieDetails.runtime % 60;
        const runtimeString = `${runtimeHour} Hours ${runtimeMinute} Minutes`;

        //GET Movie Cast
        const movieCastResponse = await fetch(`${apiUrl}${apiSearchMovieByIdExtention}${encodeURIComponent(id)}/credits`, options);
        const movieCast = await movieCastResponse.json();

        //Cast
        const castList = movieCast.cast.filter((c) => c.known_for_department == "Acting" && c.order < 7)

        //director
        const director = movieCast.crew.find((c) => c.job == "Director");

        const movieData = {
            runtime: runtime,
            movieId: movieDetails.id,
            name: movieDetails.original_title,
            runtimeString: runtimeString,
            rating: movieDetails.vote_average,
            ratingCount: movieDetails.vote_count,
            director: director.original_name,
            directorId: director.id,
            plotText: movieDetails.overview,
            castList: castList,
            genreList: movieDetails.genres,
        };
        console.log("Movie Searched: ", movieDetails.original_title," -- Runtime: " ,runtime)
        console.log(movieData);
        return movieData;

    } catch (error) {
        console.error("Search Term Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}