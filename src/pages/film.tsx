import { useEffect, useState, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCasts,getDetail,getRecommendations,getTrailers,
} from "../api/tmdb-api";
import { useTheme } from "../api/Theme";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "../components/App";
import Card from "../components/Card";
import Image from "../components/Image";
import Section from "../components/Section";
import Slider from "../components/Slider/Slider";
import { Cast, MediaType, Film as FilmData, Trailer } from "../Interfaces";
import { tmdbImageSrc, youtubeThumbnail } from "../utilies";
const TrailerModal = lazy(() => import("../components/TrailerModal"));
const Loading = lazy(() => import("../components/Loading"));
interface Props {
  mediaType: MediaType;
}
const Film = (props: Props) => {
  const location = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<any>();
  const [film, setFilm] = useState<FilmData | null | undefined>(null);
  const [trailerSrc, setTrailerSrc] = useState("");
  const playTrailer = async (key: string) => {
    setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=1`);};
  const [casts, setCasts] = useState<Cast[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<FilmData[]>([]);
  const globalContext = useGlobalContext();
  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string));
    if (film) {
      setFilm(film);
      setCasts(await getCasts(film.mediaType, film.id));
      setTrailers(await getTrailers(film.mediaType, film.id));
      setRecommendations(await getRecommendations(film.mediaType, film.id));
    }};
  const closeTrailer = () => {
    setTrailerSrc("");
  };
  useEffect(() => {
    setFilm(undefined);
    fetch();
  }, [location]);
  if (film === null) {
    // redirect to 404 page
    return <></>;
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    );
  }
  const overview = film.overview;
  const words = overview.split(" ");
  const maxWords = 45;
  const shortenedOverview = words.slice(0, maxWords).join(" ");
  
  return (
    <div
      className={`${
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}>
      {trailerSrc && (
        <TrailerModal onHide={closeTrailer} src={trailerSrc}></TrailerModal>
      )}
      {/************ background ***********/}
      <div
        className="md:min-h-screen relative centerd bg-cover bg-center bg-no-repeat -top-[88px]"
        style={{backgroundImage: `linear-gradient(290deg, #000, #0009), url(${tmdbImageSrc(
            film.coverPath
          )})`, }}>
        {/************ poster and text *****************/}
        <Section className="flex w-full  lg:flex-row flex-col md:top-10  items-center justify-evenly mobile:justify-center relative z-10 px-2 mobile:px-0">
          {" "}
          <Image
            src={tmdbImageSrc(film.posterPath)}
            className="max-w-[350px] h-[300px] mobile:h-full mobile:w-full mobile:mt-[4.5rem] mobile:mx-auto shadow-xl shadow-neutral-700 "
          ></Image>
          <div className="px-10 py-4  mobile:px-2 mobile:mx-0 flex flex-col items-start gap-y-3 mobile:border-none rounded-3xl  ">
            <p className="text-5xl md:max-w-[700px]  tracking-widest font-extrabold bg-gradient-to-r from-white via-orange-400 to-gray-400 bg-clip-text my-1 line-clamp-2 mobile:text-3xl">
              {film.title}
            </p>
            <p className="text-sm mb-2  text-zinc-400">{film.tagline}</p>
            <ul className="flex items-center gap-3 ">
              {film.generIds.map((id, i) => (
                <li  key={i}
                  className="text-light px-3 py-2 bg-primary rounded-lg text-sm">
                  {
                    globalContext.genres[film.mediaType]?.find(
                      (g) => g.id === id)?.name }
                </li>))}
            </ul>
            <p className="border-b-2 gap-x-1 bg-orange-400 flex items-center justify-center rounded-full text-white  border-primary p-3  mx-1  shadow-md">
              {film.voteAverage.toFixed(1)}
              <FaStar size={20} />
            </p>
            <p className="text-light line-clamp-3 lg:my-2 md:max-w-[650px] text-base opacity-[0.9] font-sans">
              {shortenedOverview}
            </p>
            <div className="flex items-center justify-between mobile:justify-start w-full ">
              <p className="border-b-2 border-primary px-3 py-1  bg-white text-black rounded-lg mx-1 shadow-md ">
                {film.status}
              </p>
              {casts && (
                <p className="border-b-2 border-primary px-3 py-1 me-32 mobile:text-sm mobile:me-0 bg-white text-black rounded-lg mx-1 shadow-md ">
                  <span className="font-medium text-xl text-primary mobile:text-sm">
                    Hero:
                  </span>{" "}
                  {casts[0]?.name}
                </p>)}
            </div>
            <div className="flex items-center justify-between mobile:justify-start w-full ">
              {film.releaseDate && (
                <p className=" border-b-2 bg-white text-black mobile:text-sm border-primary px-3 py-1 rounded-lg mx-1 shadow-md ">
                  {film.releaseDate}
                </p>)}

              {casts && (
                <p className="border-b-2 border-primary px-3 py-1 me-32 mobile:me-0 bg-white text-black rounded-lg mx-1 shadow-md">
                  <span className=" font-medium text-xl mobile:text-sm text-primary">
                    director:</span>{" "}{casts[1]?.name}
                </p> )}
            </div>
            {film.runtime && (
              <p className="border-b-2 bg-white text-black mobile:text-sm border-primary px-3 py-1 rounded-lg mx-1 shadow-md ">
                {film.runtime} min </p> )}
          </div>
        </Section>
      </div>
      {/********************* Cast *****************/}
      <Section title="Casts" hidden={casts.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary overflow-y-auto scrollbar-track-header">
          <div className="flex items-center gap-2 ">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[250px]" key={i}>
                <Card key={i} withPlay={false}
                  imageSrc={tmdbImageSrc(cast.profilePath)}>
                  <p className="font-semibold">{cast.name}</p>
                  <p className="opacity-[0.9] text-sm">{cast.characterName}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/********************  Trailers *********************/}
      <Section  title="Trailers"
        hidden={trailers.length === 0}>
        <Slider isMovieCard={true} num={2}>
          {(_) =>
            trailers.map((trailer, i) => (
              <Card
                onClick={() => playTrailer(trailer.key)}
                imageSrc={youtubeThumbnail(trailer.key)}
                key={i}
              ></Card>))}
        </Slider>
      </Section>
      {/**************  Seasons ****************/}
      <Section title="Seasons" hidden={film.seasons.length === 0}>
        <Slider
          slidesToShow={film.seasons.length > 2 ? 2 : 1}
          slidesToScroll={film.seasons.length > 2 ? 2 : 1}
          swipe={false}>
          {(_) =>
            film.seasons.map((season, i) => (
              <Card onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`) }
                title={season.name}
                imageSrc={tmdbImageSrc(season.posterPath)}   key={i}
              ></Card> )) }
        </Slider>
      </Section>
      {/*******************  Recommendations ******************/}

      <Section title="Recomended" hidden={recommendations.length === 0}>
        <Slider isMovieCard={true} num={4}>
          {(_) =>
            recommendations.map((film, i) => (
              <Card
                onClick={() => navigate(`/${props.mediaType}/${film.id}`)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)} key={i}></Card>))}
        </Slider>
      </Section>
    </div>
  );
};

export default Film;
