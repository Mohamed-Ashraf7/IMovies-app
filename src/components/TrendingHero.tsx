import { MdPlayCircleOutline } from "react-icons/md";
import { Film } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";
import Image from "./Image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  film: Film;
  onClick: () => void;
  onPlayTrailer: () => void;
  voteAverage: number; 
  maxStars: number; 
}
export const TrendingHero = (props: Props) => {
  const overview = props.film.overview;
  const words = overview.split(" ");
  const maxWords = 25;
  const shortenedOverview = words.slice(0, maxWords).join(" ");
  const voteAverageOutOf5 = props.voteAverage / 2;
  const filledStars = Math.floor(voteAverageOutOf5);
  const hasHalfStar = voteAverageOutOf5 - filledStars >= 0.5;
  const emptyStars = props.maxStars - filledStars - (hasHalfStar ? 1 : 0);
  return (
    <div
      className="min-h-screen  relative centerd cursor-pointer"
      onClick={() => props.onClick()}>
      <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full">
        <div className="overlay-slick-hero"></div>
        <Image
          src={tmdbImageSrc(props.film.coverPath)}
          className="w-full object-cover"
        ></Image>
        <div className="overlay-film-cover"></div>
      </div>
      <div className="flex lg:mt-12 md:flex-row flex-col gap-4 mobile:mt-20 items-center justify-between lg:gap-x-20 relative z-10 mx-1 max-w-[77%] mobile:max-w-[100%]">
        <Image
          src={tmdbImageSrc(props.film.posterPath)}
          className="max-w-[320px] mobile:w-[68%] h-[300px] mobile:mx-auto shadow-xl shadow-neutral-700"
        ></Image>
        <div className="mobile:flex md:mt-4 mobile:items-center gap-y-1 flex justify-center flex-col">
          <p className="text-3xl mobile:text-center lg:text-5xl tracking-widest font-extrabold  bg-clip-text mobile:px-2 text-start my-2 py-3">
            {props.film.title}
          </p>
          <p className="text-lg font-light mobile:text-base text-white mobile:text-center mobile:px-2">
            {shortenedOverview}
          </p>
          <p className="text-2xl text-white bg-orange-400 rounded-full p-2 w-fit">
            {props.film.voteAverage.toFixed(1)}
          </p>
          <div className="flex flex-row items-center  my-2 text-2xl ">
            {[...Array(filledStars)].map((_, index) => (
              <FaStar key={index} className="star text-primary" />
            ))}
            {hasHalfStar && <FaStar className="star half-star" />}
            {[...Array(emptyStars)].map((_, index) => (
              <FaRegStar key={index} className="star" />
            ))}
          </div>
          <button
            className="py-1 px-1 text-xl -ms-4 r my-1 centerd gap-3 w-fit bg-transparent rounded-md hover:bg-red-900"
            onClick={(e) => {
              e.stopPropagation();
              props.onPlayTrailer();}}>
            <span className="mobile:hidden block">
              {" "}
              <MdPlayCircleOutline size={90}></MdPlayCircleOutline>
            </span>
            <span className="block md:hidden">
              <MdPlayCircleOutline size={45}></MdPlayCircleOutline>
            </span>
            <span>Play trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrendingHero;
