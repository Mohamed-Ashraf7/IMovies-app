import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTheme } from "../../context/Theme";
import transformers from "../../assets/Transformers-_Rise_of_the_Beasts.webp";
import spiderMan from "../../assets/Spider.webp";
import FastX from "../../assets/Fast_X_poster.webp";
import Section from "../../components/Section";
export const LatestMovies = () => {
  return (
    <Section
    className="centerd py-12 px-5 gap-x-20 flex-col md:flex-row">
    <div className="m-auto my-4  w-auto centerd md:m-0 md:ml-10 md:h-auto md:w-auto">
      <LazyLoadImage src={transformers} alt="transformers"
        className="mx-auto -mr-10 h-52 w-[140px] shadow-2xl shadow-black brightness-75 md:-mt-0 xl:h-64 xl:w-44"
      />
      <LazyLoadImage src={spiderMan} alt="spiderMan"
        className="xl:h-68 z-[2] mx-auto h-60 w-[160px] shadow-2xl shadow-black md:-mt-0 xl:h-72 xl:w-48"
      />
      <LazyLoadImage src={FastX} alt="FastX"
        className="mx-auto -ml-10 h-52 w-[140px] shadow-2xl shadow-black brightness-75 md:-mt-0 xl:h-64 xl:w-44"
      />
    </div>
    <div className="flex flex-col justify-evenly px-1 pb-2 max-w-xl ">
      <p className="mb-4 text-center text-3xl font-extrabold  xl:text-4xl">
        Latest Releases
      </p>
      <p className="text-lg md:px-0 text-justify mobile:text-center lg:text-2xl">
        Stay up-to-date with the latest news and gossip from Hollywood and
        beyond.
      </p>
    </div>
  </Section>)
}
export const Mail = () => {
  const { theme } = useTheme();
  return (
    <Section
      className={`${theme === "light" ? "bg-[#0c0c0c] text-light" : "bg-[#f3f4f6] text-dark"
        } centerd mobile:flex-col my-10 gap-6 min-h-[120px]`}>
      <div>
        <p className="lg:text-4xl text-xl py-2 mobile:text-center">
          TRIAL START FIRST 30 DAYS.
        </p>
        <p className="text-neutral-600 text-center text-base ">
          Enter your email to create or restart your membership
        </p>
      </div>
      <div className="flex flex-row items-center ">
        <input type="email"
          className="w-[400px] mobile:w-[240px] p-4  text-black placeholder:text-gray-400 rounded-l-lg"
          placeholder="E-Mail . . . " />
        <button type="reset"
          className="bg-primary rounded-r-lg text-white  px-2 py-4 shadow-md hover:bg-blue-700">
          Continue{" "}
        </button>
      </div>
    </Section >
  )
}