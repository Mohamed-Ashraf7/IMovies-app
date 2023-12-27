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
      className="md:min-h-screen cursor-pointer relative centerd bg-cover bg-center bg-no-repeat "
        onClick={() => props.onClick()}
        style={{backgroundImage: `linear-gradient(290deg, #000, #0009),
         url(${tmdbImageSrc(props.film.coverPath)})` }}>
      <div className="flex lg:mt-12 lg:flex-row flex-col gap-y-4 mt-20 items-center justify-between lg:gap-x-20 relative z-10 mx-1 max-w-[77%] mobile:max-w-[100%]">
        <div className="md:h-[478px] md:max-w-[320px] mobile:h-[360px] overflow-hidden mobile:w-[60%] mobile:mx-auto shadow-lg shadow-black">
        <Image
       className="w-full h-full "
       src={tmdbImageSrc(props.film.posterPath)}
        ></Image></div>
       <div  className="flex justify-center lg:items-start items-center flex-col md:mt-6 mobile:text-center gap-y-2">
          <h2 className="text-3xl lg:text-4xl text-white tracking-widest font-extrabold  bg-clip-text mobile:px-2 lg:text-start my-2 ">
            {props.film.title}
          </h2>
          <p className="font-light text-base text-white mobile:px-2">
            {shortenedOverview}
          </p>
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
         <MdPlayCircleOutline className="md:w-20 w-11 h-auto" />
          </span>
         <span>Play trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrendingHero;
