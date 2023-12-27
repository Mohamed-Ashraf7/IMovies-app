import Slider from "../../components/Slider/Slider";
import { Film } from "../../Interfaces";
import { useMovieContext } from "../../context/MovieContext";
import { useNavigate } from "react-router-dom";
import TrendingHero from "../../components/TrendingHero";

type Props = {
  playTrailer: (film: Film) => void;
};
const Trending = ({ playTrailer }: Props) => {
  const navigate = useNavigate();
  const { trendings } = useMovieContext();

  return (
    <Slider className="slick-hero" slidesToShow={1} slidesToScroll={1}
      num={1} >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                voteAverage={film.voteAverage} maxStars={5}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ""}
                film={film} key={i} /> ))}
            </Slider>
  )
}

export default Trending;
