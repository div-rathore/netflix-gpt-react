import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/openai";
import model from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    //make an api call to gpt API and get movie results

    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Laila Majnu, Haider, Rockstar, Highway, Joker";
    // const gptResults = await client.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    const gptResults = await model.generateContent(gptQuery);
    console.log(gptResults.response.text());
    const gptMovies = gptResults.response.text().split(",");
    // console.log(gptMovies);

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //    result will be array of promises

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[10%]  flex justify-center ">
      <form
        className="w-full md:w-1/2 grid grid-cols-12  bg-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 "
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
