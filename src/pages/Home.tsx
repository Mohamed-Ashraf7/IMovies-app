import TrendingHero from "../components/TrendingHero";
import { useEffect, useState } from "react";
import Section from "../components/Section";
import { Film } from "../Interfaces";
import Slider from "./../components/Slider/Slider";
import Card from "../components/Card";
import { mergeFilms, tmdbImageSrc } from "../utilies";
import { Mail, LatestMovies } from "../components/handling";
import {getInTheaters,getPopulars,getTopRated,getTrailers,getTrendings,
} from "../api/tmdb-api";
import { useTheme } from "../api/Theme";
import { useNavigate } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";
import UserProfile from "../components/User";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [trendings, setTrendings] = useState<Film[]>([]);
  const [inTheaters, setInTheaters] = useState<Film[]>([]);
  const [populars, setpopulars] = useState<Film[]>([]);
  const [topRatedTv, settopRatedTv] = useState<Film[]>([]);
  const [topRatedMovie, settopRatedMovie] = useState<Film[]>([]);
  const [trailerSrc, setTrailerSrc] = useState("");

  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id);
    setTrailerSrc( `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    );};
  const detailPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`);
  };
  const fetchTopRatedMovie = async () => {
    settopRatedMovie(await (await getTopRated("movie")).films);
  };
  const fetchTopRatedTv = async () => {
    settopRatedTv(await (await getTopRated("tv")).films);
  };

  const fetchPopulars = async () => {
    const movies = await getPopulars("movie");
    const tvs = await getPopulars("tv");
    setpopulars(mergeFilms(movies, tvs, 20));
  };
  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters());
  };

  const fetchTrending = async () => {
    const movies = await getTrendings("movie");
    const tvs = await getTrendings("tv");
    setTrendings(mergeFilms(movies, tvs));
  };
  const closeTrailer = () => {
    setTrailerSrc("");
  };

  useEffect(() => {
    fetchTrending();
    fetchInTheaters();
    fetchPopulars();
    fetchTopRatedMovie();
    fetchTopRatedTv();
  }, []);
  return (
    <>
    <div className={`${theme === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}>
      {trailerSrc && (
        <TrailerModal onHide={closeTrailer} src={trailerSrc}></TrailerModal>
      )}
      {/*******************  trendings *********************/}
      <div className="py-0 min-h-screen -mt-[88px]"
        hidden={trendings.length === 0} title="Trending" >
        <Slider className="slick-hero" autoplay={true}
          slidesToShow={1} slidesToScroll={1}
          num={1}>
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                voteAverage={film.voteAverage} maxStars={5}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""}
                film={film} key={i} ></TrendingHero> ))}
        </Slider>
      </div>
      {/*********** in theaters *************************/}
      <p className="text-center  shadow-md py-2 mb-2 px-2 text-4xl my-1">
        Let's Find World Best Movies
      </p>
      <Section title="In Theaters" hidden={inTheaters.length === 0}>
        <Slider isMovieCard={true} num={6}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card vote={film.voteAverage} onClick={() => detailPage(film)}
                title={film.title} imageSrc={tmdbImageSrc(film.posterPath)}
                time={film.runtime}  key={i} ></Card>))}
        </Slider>
      </Section>
      {/*********** populars ************/}

      <Section
        title="What's Popular"
        hidden={populars.length === 0}
        className={`${
          theme === "light" ? "bg-header text-light" : " bg-[#f3f4f6] text-dark"
        } `}>
        <Slider isMovieCard={true} num={3}>
          {(_) =>
            populars.map((film, i) => (
              <Card className="md:px-3 md:min-h-[420px]" vote={film.voteAverage}
                onClick={() => detailPage(film)}  title={film.title}
                time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card> ))}
        </Slider>
      </Section>
      {/* top rated tv */}
      <Section
        title="Top Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => navigate(`/list/top-rated-tv`)}>
        <Slider isMovieCard={true} num={5}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card onClick={() => detailPage(film)}
                title={film.title}  time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>))}
        </Slider>
      </Section>
      {/*section info */}
      <Section className="flex w-full flex-col-reverse items-center justify-center py-5 lg:flex-row ">
        <LatestMovies />
      </Section>
      {/* to rated movies*/}
      <Section
        hidden={topRatedMovie.length === 0}
        className={`${theme === "light" ? "bg-header text-light" : "bg-[#f3f4f6] text-dark"
        }`} title="Top Rated Movies"
        onTitleClick={() => navigate(`/list/top-rated-movies`)}>
        <Slider isMovieCard={true} num={4}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card className="md:min-h-[420px]" vote={film.voteAverage}
                onClick={() => detailPage(film)}
                title={film.title} time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>))}
        </Slider>
      </Section>
      <Section hidden={trendings.length === 0} title="Trending Movies">
        <Slider className="slick-hero"
          autoplay={true}  slidesToShow={1}
          slidesToScroll={1}  num={1}>
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero onPlayTrailer={() => playTrailer(film)}
                voteAverage={film.voteAverage} maxStars={5}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""}
                film={film} key={i}
              ></TrendingHero>))}
        </Slider>
      </Section>
         <Mail />
      <div className="h-[40px]"></div>
    </div>
     <UserProfile/></>
  );
};
export default Home;
