import { useEffect, useState } from "react";
import Section from "../components/Section";
import { Film } from "../Interfaces";
import TrendingHero from "../components/TrendingHero";
import Slider from "./../components/Slider/Slider";
import Card from "../components/Card";
import { mergeFilms, tmdbImageSrc } from "../utilies";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TrailerModal } from "../components/TrailerModal";
import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrailers,
  getTrendings,
} from "../api/tmdb-api";
import { useTheme } from "../api/Theme";
import { useNavigate } from "react-router-dom";

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
    setTrailerSrc(
      `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    );
  };
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
    <div
      className={`${
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {trailerSrc && (
        <TrailerModal onHide={closeTrailer} src={trailerSrc}></TrailerModal>
      )}
      {/*******************  trendings *********************/}
      <div
        className="py-0 min-h-screen -mt-[88px]"
        hidden={trendings.length === 0}
        title="Trending"
      >
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          num={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                voteAverage={film.voteAverage}
                maxStars={5}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </div>
      {/*********** in theaters *************************/}
      <p className="text-center  shadow-md py-2 mb-2 text-4xl my-1">
        Let's Find World Best Movies
      </p>
      <Section title="In Theaters" hidden={inTheaters.length === 0}>
        <Slider isMovieCard={true} num={5}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
                vote={film.voteAverage}
                onClick={() => detailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                time={film.runtime}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/* populars */}

      <Section
        title="What's Popular"
        hidden={populars.length === 0}
        className={`${
          theme === "light" ? "bg-header text-light" : "bg-[#f3f4f6] text-dark"
        }`}
      >
        <Slider isMovieCard={true} num={3}>
          {(_) =>
            populars.map((film, i) => (
              <Card
                vote={film.voteAverage}
                onClick={() => detailPage(film)}
                title={film.title}
                time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/* top rated tv */}
      <Section
        title="Top Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => navigate(`/list/top-rated-tv`)}
      >
        <Slider isMovieCard={true} num={5}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                onClick={() => detailPage(film)}
                title={film.title}
                time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/*section info */}
      <Section className="flex w-full flex-col-reverse items-center justify-center py-5 lg:flex-row ">
        <div className="flex flex-col justify-evenly p-4 pb-14 ">
          <h2 className="mb-4 text-center text-3xl font-extrabold  md:text-left xl:text-4xl">
            Latest Releases
          </h2>
          <p className=" text-center text-lg md:px-0 md:text-left lg:text-2xl max-w-[600px]">
            Stay up-to-date with the latest news and gossip from Hollywood and
            beyond.
          </p>
        </div>
        <div className="m-auto my-14 flex w-auto items-center justify-center md:m-0  md:h-auto md:w-auto">
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg"
            alt="watching"
            className="mx-auto -mr-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
            alt="watching"
            className="xl:h-68 z-[2] mx-auto h-56 w-[150px] shadow-2xl shadow-black md:-mt-0 md:h-64 md:w-44 xl:h-72 xl:w-48"
          />
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg"
            alt="watching"
            className="mx-auto -ml-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
        </div>
      </Section>
      {/* to rated movies*/}
      <Section
        hidden={topRatedMovie.length === 0}
        className={`${
          theme === "light" ? "bg-header text-light" : "bg-[#f3f4f6] text-dark"
        }`}
        title="Top Rated Movies"
        onTitleClick={() => navigate(`/list/top-rated-movies`)}
      >
        <Slider isMovieCard={true} num={5}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
                vote={film.voteAverage}
                onClick={() => detailPage(film)}
                title={film.title}
                time={film.runtime}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      <Section hidden={trendings.length === 0} title="Trending Movies">
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          num={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                voteAverage={film.voteAverage}
                maxStars={5}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </Section>

      <Section
        className={`${
          theme === "light" ? "bg-header text-light" : "bg-[#f3f4f6] text-dark"
        } flex mobile:flex-col items-center justify-between min-h-[250px] my-5 `}
      >
        <div>
          <h2 className="text-5xl mobile:text-2xl  mobile:text-center">
            TRIAL START FIRST 30 DAYS.
          </h2>
          <p className="text-gray-500 text-center text-lg">
            Enter your email to create or restart your membership
          </p>
        </div>
        <div className="flex flex-row items-center ">
          {" "}
          <input
            type="email"
            className="w-[350px] mobile:w-[200px] p-4 text-black placeholder:text-gray-400 rounded-l-xl"
            placeholder="E-Mail . . . "
          />
          <button
            type="reset"
            className="bg-primary rounded-r-xl  text-white  px-3 py-4 shadow-md hover:bg-blue-700 "
          >
            Continue{" "}
          </button>
        </div>
      </Section>
      <div className="h-[40px]"></div>
    </div>
  );
};
export default Home;
