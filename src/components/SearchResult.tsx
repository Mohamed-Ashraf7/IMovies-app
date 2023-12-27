import { useEffect, useState, useRef } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Film } from "../Interfaces";
import { tmdbImageSrc } from "../utilies";
import Image from "./Image";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const SearchResult = () => {
  const location = useLocation();
  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<Film[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");
  const [keyword, setKeyword] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<any>(""); 
  const { search } = useMovieContext();

  const fetch = async () => {
    if (!keyword) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const res = await search(keyword);
      setTotalItem(res.totalPages);
      setItems(res.films);
    }, 350);
  };

  const goToSearchPage = () => {
        if (keyword) {
     defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setSearchFocus(false);
      searchRef.current?.blur();
    }
  };

  useEffect(() => {
    pathnameRef.current = location.pathname;
    defaultKeyword.current = params.get("q") || "";
   if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
     }
     }, [location.pathname, params]);

  useEffect(() => {
    fetch();
    }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setSearchFocus(false);
      setKeyword("");
          }
  };
   window.addEventListener("click", handleClickOutside);
  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
  }, [setSearchFocus,setKeyword]);

  return (
    <div className="lg:w-[400px] w-[200px] rounded-lg bg-[#3a3a3a] flex items-center justify-between px-3 p-2 focus-within:border-[1.5px] focus-within:border-primary relative">
      <input
        onClick={(e) => {
          e.stopPropagation();
          setSearchFocus(true); // Open search results on input click
        }}
        onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
        onInput={(e) => setKeyword(e.currentTarget.value)}
        value={keyword}
        type="text"
        ref={searchRef}
        className="bg-transparent outline-0 w-full text-white placeholder:text-gray-200"
        placeholder="Search for more"
      />
      <IoIosSearch size={18} className="text-white"></IoIosSearch>
          
        {isSearchFocus && keyword && (
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
             <p className="text-base px-3 truncate text-white">{film.title}</p>
             </div>
        ))}
        {totalItem > 5 && (
          <button
            onClick={() => goToSearchPage()}
            className="px-3 py-2 bg-primary w-full rounded-md sticky bottom-[0.5px]  right-0 hover:text-body shadow-lg text-white"
          > More results
          </button>
        )}
      </div>
     </div>
   )}</div>
  );
};
export default SearchResult;
