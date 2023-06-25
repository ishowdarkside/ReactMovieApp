import { useEffect, useState, useRef } from "react";
import { useMovies } from "./useMovies";
import ErrorMessage from "./ErrorMessage";
import Search from "./Search";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Navbar from "./Navbar";
import Box from "./Box";
import MovieList from "./MovieList";
import Main from "./Main";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMovieList";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import { useLocalStorageState } from "./useLocalStorageState";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);
  const InputElement = useRef(null);

  function handleSelectMovie(id) {
    setSelectedId((currId) => (currId === id ? null : (currId = id)));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((currMovies) => [...currMovies, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} InputElement={InputElement} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/*isLoading ? <Loader /> : <MovieList movies={movies} />*/}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onHandleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
