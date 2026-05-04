"use server";
import dotenv from 'dotenv';

dotenv.config();

export default async function getNowPlaying() {
  const apiUrl = process.env.NEW_API_HOST;
  const apiUrlExtention = process.env.NOW_PLAYING_URL;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEW_API_KEY}`,
      accept: "application/json",
    },
  };

  try {
    const url = `${apiUrl}${apiUrlExtention}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch now playing: ${response.status}`);
    }

    const data = await response.json();

    const nowPlaying = (data.results ?? [])
      .filter((movie) => movie.original_language === "en")
      .map((movie) => ({
        title: movie.original_title,
        id: movie.id,
        posterImage: movie.poster_path
        ? `${process.env.API_IMAGE_URL}${movie.poster_path}`
        : null,
        backdropImage: movie.backdrop_path
        ? `${process.env.API_IMAGE_URL}${movie.backdrop_path}`
        : null,
        releaseDate: movie.release_date ?? "",
      }));

    return nowPlaying;
  } catch (error) {
    console.error("Now Playing Error:", error);
    return [];
  }
}
