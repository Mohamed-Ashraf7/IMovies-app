import React, { useEffect, useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import logo from "../assets/3.png";
import { useTheme } from "../api/Theme";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { mergeClasses } from "../utilies";
import { SearchResult } from "../components/SearchResult";
import { IoIosSearch } from "react-icons/io";

const MENU_CLASS = `
  rounded-md border-none bg-white text-primary px-7 py-3 text-base font-extrabold  transition-all delay-[1] ease-in hover:bg-gray-500 hover:scale-110 hover:text-white hover:shadow-2xl hover:shadow-teal-500 
  mobile:px-5
`;
const MENU_CLASS_ACTIVE = `
  bg-gray-500
  
`;
const Header = () => {
  const location = useLocation();
  const [params, unUsedValue] = useSearchParams();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const [pathname, setPathname] = useState("");
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");
  const [keyword, setKeyword] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [show, setShow] = useState("top");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow("scrolled");
    } else {
      setShow("top");
    }
  };
  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setSearchFocus(false);
      searchRef.current?.blur();
    }
  };
  const initKeyword = () => {
    if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
    } else {
      setKeyword("");
    }
  };
  const handleWindowClick = useCallback(() => {
    setSearchFocus(false);
    initKeyword();
  }, []);
  const getMenuClass = (path: string) => {
    if (path === pathname) {
      return mergeClasses(MENU_CLASS, MENU_CLASS_ACTIVE);
    }
    return mergeClasses(MENU_CLASS, "");
  };
  useEffect(() => {
    setPathname(location.pathname);
    pathnameRef.current = location.pathname;
    defaultKeyword.current = params.get("q") || "";
    initKeyword();
  }, [location.pathname, params]);
  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleWindowClick]);

  return (
    <div
      className={` lg:backdrop-blur-2xl sticky top-0 z-[99] ${
        show === "scrolled" ? "bg-black bg-opacity-[.6]" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-4  ">
        <div className="flex items-center justify-between gap-6 ">
          <div className="h-[100%] w-[120px] rounded-sm hidden md:block">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="text-3xl mobile:text-xl font-semibold text-white">
            <Link to={"/*"}>IMovies</Link>
          </h1>
        </div>
        <div
          className="w-[400px] mobile:w-[200px] rounded-lg bg-neutral-600 flex items-center justify-between px-3 p-2 focus-within:border-[1.5px] focus-within:border-primary relative
        "
        >
          <input
            onClick={(e) => {
              e.stopPropagation();
              setSearchFocus(true);
            }}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 w-full "
            placeholder="Search for Movies,Tvs and more "
          />
          <IoIosSearch size={18}></IoIosSearch>
          {isSearchFocus && keyword ? (
            <SearchResult
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            ></SearchResult>
          ) : (
            ""
          )}
        </div>

        <div
          className="
            flex
            mobile:border-t-2
          mobile:border-primary
            mobile:rounded-lg
            mobile:fixed
            mobile:bottom-0
            mobile:left-0
            mobile:right-0
            mobile:justify-center
            mobile:items-center
            mobile:py-3
            mobile:bg-header
           border-primary
               "
        >
          <CgMenuGridO
            className={`
    ${open ? `text-primary` : "text-white"}
     hidden mobile:block cursor-pointer`}
            size={45}
            onClick={handleOpen}
          />
          <div
            className={`
    ${
      open
        ? `flex-col  bg-header justify-center gap-y-4 rounded-2xl border-t-4 fixed bottom-[50px] w-full h-[40vh]  z-[999999999]`
        : "mobile:fixed -bottom-[50vh] md:px-8 py-1 items-center flex-row gap-1.5"
    }
    transition-height duration-700 ease-in-out flex items-center`}
          >
            <Link className={getMenuClass("/movies")} to={"/movies"}>
              Movies
            </Link>
            <Link className={getMenuClass("/tv")} to={"/tv"}>
              TV
            </Link>

            <div className="md:ms-10  flex justify-center">
              <label className="toggle" htmlFor="switch">
                <input
                  id="switch"
                  className="input"
                  type="checkbox"
                  onChange={toggleTheme}
                />
                <div className="icon icon--moon">
                  <svg
                    height="32"
                    width="32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="icon icon--sun">
                  <svg
                    height="32"
                    width="32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                  </svg>
                </div>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Header;
