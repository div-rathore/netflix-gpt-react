import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
//   console.log(movies && movies[0]);
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl text-white py-4 pb-6">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
