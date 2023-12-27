import { Fragment } from "react";
import Section from "../../components/Section";
import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card";
import {DetailPage} from "../../Interfaces";
import { LatestMovies } from "../landing/Latest";
import { tmdbImageSrc } from "../../utilies";
import { useMovieContext } from "../../context/MovieContext";

const TopRated = ({detailPage}:DetailPage) => {
   const { topRatedMovie , topRatedTv } = useMovieContext();

  return (
    <Fragment>
        <Section className="py-10" title="Top Rated TV" hidden={topRatedTv.length === 0}>
        <Slider isMovieCard={true} num={5}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card className="md:h-[350px]" onClick={() => detailPage(film)}
                title={film.title}  release={film.releaseDate}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>))}
        </Slider>
      </Section>
      <div className="flex w-full  border-black flex-col-reverse items-center justify-center pt-3 lg:flex-row ">
        <LatestMovies />
      </div>
      {/* to rated movies*/}
      <Section hidden={topRatedMovie.length === 0} title="Top Rated Movies">
        <Slider isMovieCard={true} num={4}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card className="md:h-[430px]" vote={film.voteAverage}
                onClick={() => detailPage(film)}
                title={film.title} release={film.releaseDate}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />))}
        </Slider>
      </Section>
    </Fragment>
  )
}

export default TopRated;
