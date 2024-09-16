import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer =(movieId)=> {
      // Fetch trailer video and updating the store with trailer video data
    const dispatch = useDispatch();
    const getMovieId = async () => {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();
        // console.log(json);
    
        const filterData = json.results.filter((video) => video.type == "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer));
      };
      useEffect(() => {
        getMovieId();
      }, []);
    
}

export default useMovieTrailer;