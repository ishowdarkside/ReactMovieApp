import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "1b7993a5";
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { singal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();

          if (data.Response === "False")
            throw new Error(`No movies found  for ${query}`);
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      setError("");
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
