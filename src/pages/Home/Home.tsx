import { useState,Fragment } from "react";
import { Film } from "../../Interfaces";
import {useMovieContext } from "../../context/MovieContext";
import { useTheme } from "../../context/Theme";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../../components/TrailerModal";
import { Mail } from "../landing/Latest";
import Trending from './Trending';
import Theaters from './Theaters';
import Popular from'./Popular';
import TopRated from './TopRated';
import Actors from "./Actors";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); 
  const {getTrailers } = useMovieContext();
  const [trailerSrc, setTrailerSrc] = useState("");
  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id);
    setTrailerSrc(`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`);
  };
  const detailPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`);
  };

  const closeTrailer = () => {
    setTrailerSrc("");
  };
  return (
    <Fragment>
    <div className={`${theme === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {trailerSrc && (
        <TrailerModal onHide={closeTrailer} src={trailerSrc}></TrailerModal>
      )}
        <div className="py-0 min-h-screen -mt-[88px]">
          <Trending playTrailer={playTrailer} />
        </div>
        <Theaters detailPage={detailPage}/>
        <Popular detailPage={detailPage} />
        <TopRated detailPage={detailPage} />
        <Actors />
         <Mail />
      <div className="h-[40px]"></div>
      </div>
      
    </Fragment>
  );
};
export default Home;
