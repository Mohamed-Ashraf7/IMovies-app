import { MdPlayCircleOutline } from "react-icons/md";
import { TrendHeroProps } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";
import Image from "./Image";
import { FaStar, FaRegStar } from "react-icons/fa";

export const TrendingHero = (props: TrendHeroProps) => {
  
  const shortenedOverview = props.film.overview.split(" ")
  .slice(0, 25).join(" ");
  const filledStars = Math.floor(props.voteAverage / 2);
  const hasHalfStar = filledStars - filledStars >= 0.5;
  const emptyStars = props.maxStars - filledStars - (hasHalfStar ? 1 : 0);
  return (
    <div
      className="min-h-screen cursor-pointer relative centerd bg-cover bg-center bg-no-repeat"
        onClick={() => props.onClick()}
        style={{backgroundImage: `linear-gradient(290deg, #000, #0009),
         url(${tmdbImageSrc(props.film.coverPath)})` }}>
      <div className="flex lg:mt-12 lg:flex-row flex-col gap-y-4 mt-[4rem] items-center justify-between lg:gap-x-20 relative z-10 max-w-[77%] mobile:max-w-full">
        <div className="overflow-hidden  md:h-[478px] md:max-w-[320px] mobile:h-[355px]  mobile:w-[240px] mobile:mx-auto shadow-lg shadow-black ">
        <Image
         src={tmdbImageSrc(props.film.posterPath)}
          />
        </div>
       <div  className="flex justify-center lg:items-start items-center flex-col md:mt-6 mobile:text-center gap-y-2">
          <h2 className="text-2xl lg:text-3xl text-white tracking-widest font-extrabold  bg-clip-text mobile:px-2 lg:text-start my-2">
            {props.film.title.slice(0,40)}
          </h2>
          <div className="font-light text-base  text-white mobile:px-2">
            <span className="mobile:hidden block">{shortenedOverview}</span>
            <span className="block md:hidden">{props.film.releaseDate}</span>
          </div>
          <div className="flex items-start justify-center mobile:flex-row flex-col gap-4">
          <span className="text-2xl text-white bg-red-600 rounded-2xl p-2 w-fit">
            {props.film.voteAverage.toFixed(1)}
          </span>
          <div className="flex flex-row items-center my-2 text-2xl ">
            {[...Array(filledStars)].map((_, index) => (
              <FaStar key={index} className="star text-primary" />
            ))}
            {hasHalfStar && <FaStar className="star half-star" />}
            {[...Array(emptyStars)].map((_, index) => (
              <FaRegStar key={index} className="star" />
            ))}
            </div>
            </div>
         <button 
         className="flex pe-1 justify-start items-center text-white text-xl my-1 gap-2 w-fit bg-transparent rounded-md hover:bg-red-900"
          onClick={(e) => {
            e.stopPropagation();
           props.onPlayTrailer();
            }}
            aria-label="Play trailer"
            aria-hidden="false"
            
         >
       <span className="block">
         <MdPlayCircleOutline className="md:w-20 w-16 h-auto" />
          </span>
         <span>Play trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrendingHero;
