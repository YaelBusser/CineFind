export async function getMovieDetails(movieId) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}