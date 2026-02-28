"use server";
export default async function searchMovieId(id) {
    const apiSearchUrl = process.env.API_ID_SEARCH_URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY1,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    }

    try {
        const url = `${apiSearchUrl}?id=${encodeURIComponent(id)}`;
        const response = await fetch(url, options);
        const data = await response.json()
        console.log(data)
        const name = data.originalTitleText.text
        const runtime = data.runtime.seconds.toString()
        const movieData = {
            runtime,
            movieId: data?.id ?? null,
            name: data?.originalTitleText?.text ?? "Unavailable",
            runtimeString: data?.runtime?.displayableProperty?.value?.plainText ?? "",
            rating: data?.ratingsSummary?.aggregateRating ?? null,
            ratingCount: data?.ratingsSummary?.voteCount ?? 0,
            director: data?.directorsPageTitle?.[0]?.credits?.[0]?.name?.nameText?.text ?? "Unavailable",
            directorId: data?.directorsPageTitle?.[0]?.credits?.[0]?.name?.id ?? null,
            plotText: data?.plot?.plotText?.plainText ?? "",
            castList: Array.isArray(data?.castPageTitle?.edges) ? data.castPageTitle.edges.slice(0, 5) : [],
            genreList: Array.isArray(data?.titleGenres?.genres) ? data.titleGenres.genres : [],
            relatedMoviesList: Array.isArray(data?.moreLikeThisTitles?.edges)
                ? data.moreLikeThisTitles.edges.slice(0, 5)
                : [],
            };
        console.log("Movie Searched: ", name," -- Runtime: " ,runtime)
        return movieData;

    } catch (error) {
        console.error("Search Term Error:", error);
        const status = error?.status ?? error?.statusCode ?? 500;
        return { error: true, message: error?.message ?? "Unknown error", status };
        }
}