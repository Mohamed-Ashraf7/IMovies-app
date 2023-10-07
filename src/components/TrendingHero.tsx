import { MdPlayCircleOutline } from "react-icons/md";

import { Film } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";
import Image from "./Image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  film: Film;
  onClick: () => void;
  onPlayTrailer: () => void;
  voteAverage: number; // Rating value (e.g., 3.5, 4.0)
  maxStars: number; // Optional: Maximum number of stars (default is 5)
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
      className="min-h-screen  relative flex items-center justify-center cursor-pointer"
      onClick={() => props.onClick()}
    >
      {/* bg image */}
      <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full">
        <div className="overlay-slick-hero"></div>
        <Image
          src={tmdbImageSrc(props.film.coverPath)}
          className="w-full object-cover"
        ></Image>
        <div className="overlay-film-cover"></div>
      </div>
      {/* text */}
      <div className="flex lg:mt-10 md:flex-row flex-col gap-3  mobile:mt-20 items-center justify-between lg:gap-x-10 relative z-10 mx-1 max-w-[70%] mobile:max-w-[100%]">
        <Image
          src={tmdbImageSrc(props.film.posterPath)}
          className="max-w-[320px] mobile:max-w-[200px] h-[300px]   mobile:mx-auto shadow-xl shadow-neutral-700"
        ></Image>

        <div className="mobile:flex mobile:items-center flex justify-center flex-col">
          <p className="text-3xl lg:text-7xl  text-white border-b-2 text-center border-primary my-4 py-2 ">
            {props.film.title}
          </p>
          <p className="text-lg mobile:text-md text-white mobile:text-center">
            {shortenedOverview}
          </p>
          <p className="text-2xl mobile:text-md text-white bg-orange-400 rounded-full p-1 w-fit">
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
            className="px-3 py-1.5 font-croissant-one  text-xl justify-center my-4 flex items-center gap-3 bg-primary rounded-md hover:bg-red-900"
            onClick={(e) => {
              e.stopPropagation();
              props.onPlayTrailer();
            }}
          >
            <MdPlayCircleOutline size={18}></MdPlayCircleOutline>
            <span>Play trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrendingHero;
