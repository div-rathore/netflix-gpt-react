import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {

    const gpt = useSelector(store => store.gpt);
    const {movieResults, movieNames} = gpt;
    if(!movieNames) return null;

  return (
    <div className='bg-opacity-80 p-4 m-4 text-white bg-black '>
       {movieNames.map((movieName, index) =>   <MovieList key={movieName} title={movieName} movies={movieResults[index]}></MovieList>)}
   
    </div>
  )
}

export default GptMovieSuggestions