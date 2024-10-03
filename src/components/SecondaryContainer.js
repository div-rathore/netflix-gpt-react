import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-black">
      <div className="mt-0 md:-mt-32 relative z-20 pl-4 md:pl-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
      {/* 
      Movie List- popular
        MovieCard * n
      Movie list - Nopw Playing
      moviue List- Trending
      Movie List - Horror
       */}
    </div>
  );
};

export default SecondaryContainer;
