
import Slider from "../../components/Slider/Slider";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { tmdbImageSrc } from "../../utilies";
import { useMovieContext } from "../../context/MovieContext";

const Actors = () => {
  const { Actor } = useMovieContext();

  return (
    
      <Section title="Top Actors Per Day " hidden={!Actor || Actor.length === 0}>
        {Actor && Actor.length > 0 && (
          <Slider isMovieCard={true} num={6}>
            {(_) =>
              Actor.map((actor, i) => (
                <Card
                  vote={actor.popularity}
                  title={actor.name}
                  imageSrc={tmdbImageSrc(actor.profile_path)}
                  key={i}
                > popular </Card>
              ))}
          </Slider>
        )}
      </Section>
    
  );
};

export default Actors;
