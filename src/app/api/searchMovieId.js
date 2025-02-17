"use server";
export default async function searchMovieId(id) {
    const apiSearchUrl = process.env.API_ID_SEARCH_URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    }

    try {
        const url = `${apiSearchUrl}?id=${encodeURIComponent(id)}`;
        const response = await fetch(url, options);
        const data = await response.json()
        
        const name = data.originalTitleText.text
        const runtime = data.runtime.seconds.toString()
        const movieData = {
            runtime: data.runtime.seconds.toString(),
            movieId: data.id,
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
        console.log("Movie Searched: ", name," -- Runtime: " ,runtime)
        return movieData;

    } catch (error) {
        console.error("Search Term Error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}