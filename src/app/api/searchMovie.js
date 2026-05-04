"use server";
import dotenv from 'dotenv';

dotenv.config();

export default async function searchMovie(term) {
    console.log("Term searched: " + term);
    const apiUrl = process.env.NEW_API_HOST;
    const apiUrlExtention = process.env.NEW_MOVIE_SEARCH_URL;

    const options = {
        method: 'GET',
        headers: {
            'Authorization':` Bearer ${process.env.NEW_API_KEY}`,
            'accept': "application/json" 
        }
    }

    try {
        const url = `${apiUrl}${apiUrlExtention}?query=${encodeURIComponent(term)}&include_adult=false&language=en-US&page=1`;
        const response = await fetch(url, options);
        const data = await response.json()
        

        const movieList = data.results.map((movie) => {
            if( movie.popularity >= 2.5){
                let info;
                const posterUrl = process.env.API_IMAGE_URL + movie.poster_path;
                try {
                        info = {
                            "title": movie.original_title,
                            "id": movie.id,
                            "image": posterUrl,
                            "releaseDate": movie.release_date 
                        }
                    } catch (error) {
                        info = {"title": "Unavailable", "id": "Unavailable", "image": null, "releaseDate": ""}
                    }
                    return info;
                }
                return null;
            }).filter((movie) => movie !== null);
        console.log(movieList)
        return movieList;

    } catch (error) {
        console.error("Search Term Error: ", error);
    }
}
