import { useEffect, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { useTheme } from "../context/Theme";
import { FaStar } from "react-icons/fa";
import Card from "../components/Card";
import Image from "../components/Image";
import Section from "../components/Section";
import Slider from "../components/Slider/Slider";
import { Cast, Genre,MediaType, Film as FilmData, Trailer } from "../Interfaces";
import { tmdbImageSrc, youtubeThumbnail } from "../utilies";
import Loading from "../components/Loading";
import TrailerModal from"../components/TrailerModal";
type Genres = {
  [key in MediaType]: Genre[];
};
interface Props {
  mediaType: MediaType;
}
const Film = (props: Props) => {

  const navigate = useNavigate();
  const { theme } = useTheme();
  const { id } = useParams<any>();
  const location = useLocation();
  const {getCasts,getDetail,getRecommendations,getTrailers,getGenres}=useMovieContext();
  const [genres, setGenres] = useState<Genres>({movie: [],tv: []});
  const [film, setFilm] = useState<FilmData | null | undefined>(null);
  const [trailerSrc, setTrailerSrc] = useState("");
  const [casts, setCasts] = useState<Cast[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<FilmData[]>([]);
  
  const playTrailer = async (key: string) => {
    setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=1`);
   
  };
 
 const fetch =async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string));
    const movie = await getGenres("movie");
    const tv = await getGenres("tv");
   if (film) {
      setFilm(film);
      setCasts(await getCasts(film.mediaType, film.id));
      setTrailers(await getTrailers(film.mediaType, film.id));
      setRecommendations(await getRecommendations(film.mediaType, film.id));
      setGenres({movie,tv});
   }
 };
  
  const closeTrailer = () => {
    setTrailerSrc("");
     };
  useEffect(() => {
    console.log("efeect two");
    setFilm(undefined);
    fetch();
   
  }, [location]);
 
  if (film === null) {
    return <span> Error : thier is no film Found</span>;
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading />
      </div>
    );
  }
  
  const words = film.overview.split(" ");
  const shortenedOverview = words.slice(0, 45).join(" ");
   
  return (
    <div
      className={`${
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {trailerSrc && (
        <TrailerModal onHide={closeTrailer} src={trailerSrc}></TrailerModal>
      )}
      {/************ background ***********/}
      <div className="min-h-screen relative centerd -top-[88px]">
      <div className="absolute left-0 top-0 right-0 bottom-0 w-full">
        <div className="overlay-slick-hero"></div>
        <Image
          src={tmdbImageSrc(film.coverPath)}
          className=" w-full object-cover"
        ></Image>
        <div className="overlay-film-cover"></div>
      </div>
        {/************ poster and text *****************/}
        <div className="flex w-full  lg:flex-row flex-col md:top-10  items-center justify-evenly mobile:justify-center relative z-10 px-2 mobile:px-0">
          {" "}
          <Image
            src={tmdbImageSrc(film.posterPath)}
            className="max-w-[350px] mobile:w-[50%] h-[300px] mobile:h-full  mobile:mt-[4.6rem] mobile:mx-auto shadow-xl shadow-neutral-700 "
          ></Image>
          <div className="px-10 py-4  mobile:px-2 mobile:mx-0 flex flex-col items-start gap-y-3 mobile:border-none rounded-3xl  ">
            <p className="text-5xl md:max-w-[700px] w-full text-nowrap tracking-wide font-extrabold bg-gradient-to-r from-white via-orange-400 to-gray-400 bg-clip-text my-1 line-clamp-2 mobile:text-2xl">
              {film.title}
            </p>
            <p className="text-sm mb-2 text-zinc-400">{film.tagline}</p>
            <ul className="flex items-center gap-3 ">
              {film.generIds.map((id, i) => (
                <li  key={i}
                  className="text-light px-2 py-2 bg-primary rounded-lg text-sm">
                  {genres[film.mediaType]?.find(
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
        </div>
      </div>
      {/********************* Cast *****************/}
      <Section title="Casts" hidden={casts.length === 0} className="relative -top-10 py-0">
        <div className="scrollbar scrollbar-thumb-primary overflow-y-auto scrollbar-track-header">
          <div className="flex items-center gap-x-1 ">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[200px]" key={i}>
                <Card key={i} withPlay={false}
                  imageSrc={tmdbImageSrc(cast.profilePath)}>
                  <p className="font-semibold mx-auto">{cast.name}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/********************  Trailers *********************/}
      <Section  title="Trailers" className="mobile:h-[200px] h-[300px] overflow-hidden"
        hidden={trailers.length === 0}>
        <Slider   isMovieCard={true} num={3}>
          {(_) =>
            trailers.map((trailer, i) => (
              <Card
              className="max-w-[300px]"
                onClick={() => playTrailer(trailer.key)}
                imageSrc={youtubeThumbnail(trailer.key)}
                key={i}
              />))}
        </Slider>
      </Section>
      {/**************  Seasons ****************/}
      <Section title="Seasons"  hidden={film.seasons.length === 0}>
        <Slider
          slidesToShow={2}
          slidesToScroll={1}
          swipe={false}>
          {(_) =>
            film.seasons.map((season, i) => (
              <Card className="md:h-[430px]" onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`) }
                title={season.name}
                imageSrc={tmdbImageSrc(season.posterPath)}   key={i}
              /> )) }
        </Slider>
      </Section>
      {/*******************  Recommendations ******************/}
     <Section title="Recomended" className="pb-20" hidden={recommendations.length === 0}>
        <Slider isMovieCard={true} num={4}>
          {(_) =>
            recommendations.map((film, i) => (
              <Card
                className="space-x-1 md:h-[430px]"
                release={film.releaseDate}
                vote={film.voteAverage}
                onClick={() => navigate(`/${props.mediaType}/${film.id}`)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)} key={i}></Card>))}
        </Slider>
      </Section>
    </div>
  );
};

export default Film;
