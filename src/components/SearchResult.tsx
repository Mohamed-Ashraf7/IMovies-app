import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../api/tmdb-api";
import { Film } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";
import { useGlobalContext } from "./App";
import Image from "./Image";

interface Props {
  keyword: string;
  goToSearchPage: Function;
}

export const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const searchTimeout = useRef<any>("");
  const globalContext = useGlobalContext();
  const navigate = useNavigate();

  const fetch = async () => {
    if (!props.keyword) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const res = await search(props.keyword);
      setTotalItem(res.totalPages);
      setItems(res.films);
    }, 120);
  };

  useEffect(() => {
    fetch();
  }, [props.keyword]);
  console.log("SearchResult");
  return (
    <div className="absolute top-[48px] left-0 right-0 rounded-md bg-header shadow-lg overflow-y-scroll">
      <div className="max-h-[480px] scrollbar scrollbar-thumb-primary scrollbar-track-header pl-1">
        {items.map((film, i) => (
          <div
            key={i}
            className="flex items-start p-1.5 rounded-lg hover:bg-header cursor-pointer m-1.5"
            onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
          >
            <Image
              src={tmdbImageSrc(film.posterPath)}
              className="max-h-[100px] max-w-[100px] rounded-md object-cover"
            ></Image>
            <div className="px-3 truncate">
              <p className="text-base truncate text-white">{film.title}</p>
              <ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
                {film.generIds.map((id, i) => (
                  <li key={i} className="text-gray-300">
                    {
                      globalContext.genres[film.mediaType].find(
                        (g) => g.id === id)?.name}
                    {i !== film.generIds.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {totalItem > 5 && (
          <button
            onClick={() => props.goToSearchPage()}
            className="px-3 py-2 bg-primary w-full rounded-md sticky bottom-[0.5px]  right-0 hover:text-body shadow-lg text-white"
          > More results
          </button>
        )}
      </div>
    </div>
  );
};
export default SearchResult;
