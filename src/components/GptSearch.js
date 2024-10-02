import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          src= {BG_URL}
          alt="banner"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
      {/* 
        - gpt search bar
        - gpt movie suggestion
        */}
    </div>
  );
};

export default GptSearch;
