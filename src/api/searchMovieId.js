import useFormStore from '../store/form-data.js';

export default async function searchMovieId() {
    const { selectedMovieId, setIdSearchResults } = useFormStore.getState();
    const apiSearchUrl = process.env.NEXT_PUBLIC_API_ID_SEARCH_URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST
        }
    }

    try {
        const url = `${apiSearchUrl}?id=${encodeURIComponent(selectedMovieId)}`;
        const response = await fetch(url, options);
        const data = await response.json()
        console.log(data)
        const name = data.originalTitleText.text
        const runtime = data.runtime.seconds.toString()
        const movieData = {
            runtime: data.runtime.seconds.toString(),
            name: data.originalTitleText.text,
            runtimeString: data.runtime.displayableProperty.value.plainText,
            rating: data.ratingsSummary.aggregateRating,
            ratingCount: data.ratingsSummary.voteCount,
            director: data.directors[0]?.credits[0]?.name.nameText.text, // Use optional chaining to avoid errors
            directorId: data.directors[0]?.credits[0]?.name.id,
            plotText: data.plot.plotText.plainText,
            castList: data.cast.edges.slice(0, 5),
            genreList: data.titleGenres.genres,
            relatedMoviesList: data.moreLikeThisTitles.edges.slice(0, 5),
        };
        setIdSearchResults(movieData)
        console.log("Movie Searched: ", name," -- Runtime: " ,runtime)

    } catch (error) {
        console.error("Search Term Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}