import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeason } from "../api/tmdb-api";
import Image from "../components/Image";
import Section from "../components/Section";
import { Season as SeasonInterface } from "../Interfaces";
import { formatDate, tmdbImageSrc } from "../utilies";
import { useTheme } from "../api/Theme";
const Season = () => {
  const [season, setSeason] = useState<SeasonInterface | null>(null);
  const { theme } = useTheme();
  const params = useParams<any>();

  const fetch = async () => {
    setSeason(
      await getSeason(
        parseInt(params.id as string),
        parseInt(params.seasonNumber as string)
      )
    );
  };

  useEffect(() => {
    fetch();
  }, []);
  console.log("Season");
  if (!season) {
    return <></>;
  }
  return (
    <div
      className={`relative ${
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* background */}
      <div className="h-[350px] left-0 right-0 -top-[88px] relative">
        <div className="overlay-film-cover"></div>
        <Image
          className="rounded-0 rounded-none object"
          src={tmdbImageSrc(season.posterPath)}
        ></Image>
      </div>
      <Section className="-mt-[360px] flex items-center absolute z-10 mobile:block">
        <Image
          src={tmdbImageSrc(season.posterPath)}
          className="max-w-[350px] mobile:max-w-[200px] mobile:max-h-[300px] max-h-[430px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start mobile:items-center gap-3 mt-20 mobile:mt-2">
          <p className="text-4xl line-clamp-1">{season.filmName}</p>
          <div className="flex items-center border-b-4 border-primary">
            <p className="text-md opacity-[0.7] ">
              {season.name} ({new Date(season.airDate).getFullYear()})
            </p>
            <p className="text-sm opacity-[0.9] ml-1">
              &#8226; {season.episodes?.length} episodes
            </p>
          </div>
        </div>
      </Section>
      {/* episodes */}
      <Section title="Episodes" className="mt-14">
        {season.episodes.map((episode, i) => (
          <div
            className="my-6 flex items-start justify-center gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-header px-3 py-1.5 mobile:block"
            key={i}
          >
            <Image
              src={tmdbImageSrc(episode.stillPath)}
              className="max-w-[400px] h-[220px]"
            ></Image>
            <div className="overflow-hidden flex flex-col gap-3 mobile:py-3">
              <p className="text-2xl text-primary bg-white rounded-md p-2 max-w-fit truncate">
                {episode.episodeNumber}. {episode.title}
              </p>
              <p className="opacity-[0.8] line-clamp-5">{episode.overview}</p>
              <div className="mt-auto pt-3 text-right text-orange-400">
                {formatDate(episode.airDate)}
              </div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
};
export default Season;
