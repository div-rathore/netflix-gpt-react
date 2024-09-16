import React, { useEffect } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  //const data from TMDB API and update the store with all those movies
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
      {/* 
mainContainer
  -videoBackground
  -VideoTitle
SecondaryContainer
  -MovieList * n
  -cards * n
*/}
    </div>
  );
};

export default Browse;
