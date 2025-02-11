import useFormStore from '../store/form-data.js';

export default async function searchMovie(req, res) {
    const { searchTerm, setSearchResults } = useFormStore.getState();
    console.log("Term searched: " + searchTerm);

    const apiSearchUrl = process.env.NEXT_PUBLIC_API_SEARCH_URL;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST
        }
    }

    try {
        const url = `${apiSearchUrl}?query=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url, options);
        const data = await response.json()
        const movieList = data.titleResults.results.map((movie) => {
            const posterUrl = movie.titlePosterImageModel?.url || null;
            if (movie.imageType === "movie"){
                return {"title": movie.titleNameText, "id": movie.id, "image": posterUrl, "releaseDate": movie.titleReleaseText}
            }
            return null;
        }).filter((movie) => movie !== null);
        setSearchResults(movieList)
        console.log("movie list:",movieList)

    } catch (error) {
        console.error("Search Term Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
