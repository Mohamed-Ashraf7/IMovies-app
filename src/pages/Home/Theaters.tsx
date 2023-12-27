import {Fragment } from "react";
import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card";
import Section from "../../components/Section";
import {DetailPage} from "../../Interfaces";
import {tmdbImageSrc } from "../../utilies";
import {useMovieContext } from "../../context/MovieContext";

const Theaters = ({detailPage}:DetailPage) => {
  const { inTheaters } = useMovieContext();

  return (
    <Fragment>
        <p className="text-center mobile:text-2xl shadow-md py-2 px-2 text-4xl my-2">
        Let's Find World Best Movies
       </p>
      <Section title="In Theaters" hidden={inTheaters.length === 0}>
        <Slider isMovieCard={true} num={6} autoplay={true}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card  vote={film.voteAverage}   onClick={() => detailPage(film)}
                title={film.title} imageSrc={tmdbImageSrc(film.posterPath)}
                release={film.releaseDate}  key={i} />))}
        </Slider>
      </Section>
    </Fragment>
  )
}
export default Theaters;
