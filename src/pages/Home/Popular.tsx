import Section from "../../components/Section";
import Card from "../../components/Card";
import Slider from "../../components/Slider/Slider";
import { DetailPage} from "../../Interfaces";
import { useMovieContext } from "../../context/MovieContext";
import {tmdbImageSrc } from "../../utilies";

const Popular = ({ detailPage}:DetailPage) => {
 const { populars } = useMovieContext();
  
  return (
      <Section title="What's Popular" hidden={populars.length === 0}>
        <Slider isMovieCard={true} num={3} >
          {(_) =>
            populars.map((film, i) => (
              <Card className="md:h-[460px] " vote={film.voteAverage}
                onClick={() => detailPage(film)}  title={film.title}
               release={film.releaseDate}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              /> ))}
        </Slider>
      </Section>
  )
}

export default Popular;
