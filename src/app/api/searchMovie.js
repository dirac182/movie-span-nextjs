"use server";
import dotenv from 'dotenv';

dotenv.config();

export default async function searchMovie(term) {
    console.log("Term searched: " + term);

    const apiSearchUrl = process.env.API_SEARCH_URL;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    }

    try {
        const url = `${apiSearchUrl}?query=${encodeURIComponent(term)}`;
        const response = await fetch(url, options);
        const data = await response.json()
        const movieList = data.titleResults.results.map((movie) => {
            const posterUrl = movie.listItem.primaryImage?.url || null;
            if (movie.listItem.titleType.id === "movie"){
                return {"title": movie.listItem.originalTitleText, "id": movie.index, "image": posterUrl, "releaseDate": movie.listItem.releaseDate.year}
            }
            return null;
        }).filter((movie) => movie !== null);
        console.log(movieList)
        return movieList;

    } catch (error) {
        console.error("Search Term Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
