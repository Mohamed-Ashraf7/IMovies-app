import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import bg from "../assets/auke-bakker-CTTJHNwbtPg-unsplash.jpg";
import { useTheme } from "../api/Theme";
import { discover, getTopRated, search } from "../api/tmdb-api";
import Card from "../components/Card";
import Section from "../components/Section";
import { MediaType, Film } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";

interface Props {
  type: MediaType | "search" | "list";
}

const Catalog = (props: Props) => {
  let title = "";
  let request: (page: number) => Promise<{
    totalPages: number;
    films: Film[];
  }>;

  const [films, setFilms] = useState<Film[]>([]);
  const [params, _] = useSearchParams();
  const page = useRef(1);
  const totalPage = useRef(2);
  const loadingRef = useRef(false);
  const { theme } = useTheme();
  const [onLoading, setOnLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { listTitle } = useParams<any>();

  switch (props.type) {
    case "movie":
      title = "Movies";
      request = (page: number) => discover("movie", page);
      break;

    case "tv":
      title = "TV";
      request = (page: number) => discover("tv", page);
      break;

    case "search":
      title = `Search results for <i>${params.get("q")}</i>`;
      request = (page: number) => search(params.get("q") || "", page);
      break;

    case "list":
      title = listTitle as string;

      if (title === "top-rated-tv") {
        request = (page: number) => getTopRated("tv", page);
      } else if (title === "top-rated-movies") {
        request = (page: number) => getTopRated("movie", page);
      }
      break;
    default:
      break;
  }

  const fetch = async () => {
    loadingRef.current = true;
    setOnLoading(true);

    const { films, totalPages } = await request(page.current);

    setOnLoading(false);
    loadingRef.current = false;

    totalPage.current = totalPages;
    setFilms((arrs) => [...arrs, ...films]);
  };

  const onWindowScroll = () => {
    if (loadingRef.current) return;

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (totalPage.current > page.current) {
        page.current++;
        fetch();
      }
    }
  };

  useEffect(() => {
    setFilms([]);
    fetch();
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);
    return (
    <div
      className={`${
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* background */}
      <div
        className="h-[300px]  left-0 right-0 -top-[88px] relative flex items-end py-10 justify-center"
        style={{
          backgroundImage: ` url(${bg})`,
          backgroundPosition: "center 60%",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-5xl bg-opacity-10 mobile:text-2xl p-2 bg-white rounded-md text-white">
          {" "}
          Take Me To The Moon . . .{" "}
        </h2>
      </div>
      {/* PAGE TITLE */}
      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={title}
      ></Section>
      {/* Films */}
      <Section>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 mobile:grid-cols-2 relative z-[11]">
          {films.map((film, i) => (
            <div key={i}>
              <Card
                onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
                imageSrc={tmdbImageSrc(film.posterPath)}
                title={film.title}
                vote={film.voteAverage}
                key={i}
              ></Card>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
export default Catalog;
