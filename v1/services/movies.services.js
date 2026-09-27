import axios from "axios";

export const searchMoviesService = async title => {

    const response = await axios.get(
        "https://es.wikipedia.org/w/api.php",
        {
            params: {
                action: "query",
                list: "search",
                srsearch: `${title} película`,
                format: "json",
                origin: "*"
            },
            headers: {
                "User-Agent": "CineReview/1.0"
            },
            timeout: 5000
        }
    );

    return response.data.query.search.map(x => ({
        externalMovieId: String(x.pageid),
        title: x.title,
        description: x.snippet.replace(/<[^>]*>/g, "")
    }));
};