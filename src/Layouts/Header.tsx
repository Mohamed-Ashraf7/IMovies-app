import React, { useEffect, useState, useRef, useCallback } from "react";
import Container from "../components/Container";
import logo from "../assets/3.webp";
import { ToggleTheme, useTheme } from "../api/Theme";
import {Link, useLocation,useNavigate,useSearchParams,} from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { SearchResult } from "../components/SearchResult";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const location = useLocation();
  const [params,_] = useSearchParams();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const pathnameRef = useRef("");
  const defaultKeyword = useRef("");
  const [keyword, setKeyword] = useState("");
  const [isSearchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [show, setShow] = useState("top");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow("scrolled");
    } else {
      setShow("top");
    }};
  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword;
      navigate(`/search?q=${keyword}`);
      setSearchFocus(false);
      searchRef.current?.blur();
    }};
  const initKeyword = () => {
    if (pathnameRef.current === "/search") {
      setKeyword(defaultKeyword.current);
    } else {
      setKeyword("");
    }};
  const handleWindowClick = useCallback(() => {
    setSearchFocus(false);
    initKeyword();
  }, []);
  
  useEffect(() => {
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
        show === "scrolled" ? "bg-black bg-opacity-[.7]" : "bg-transparent"}`}>
      <Container className="flex items-center justify-between gap-4  ">
        <div className="flex items-center justify-between gap-6 ">
            <img src={logo} alt="Logo" className="h-[100%] w-[120px] rounded-sm hidden md:block"/>
          <h1 className="text-3xl mobile:text-xl font-semibold text-white">
            <Link to={"/*"}>IMovies</Link>
          </h1>
        </div>
        <div
          className="w-[400px] mobile:w-[200px] rounded-lg bg-neutral-600 flex items-center justify-between px-3 p-2 focus-within:border-[1.5px] focus-within:border-primary relative" >
          <input
            onClick={(e) => {
              e.stopPropagation();
              setSearchFocus(true);}}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 w-full"
            placeholder="Search for Movies,Tvs and more "/>
          <IoIosSearch size={18}></IoIosSearch>
          {isSearchFocus && keyword ? (
            <SearchResult keyword={keyword}
              goToSearchPage={goToSearchPage}></SearchResult>
          ) : ("")}</div>
        <div className="mobileNav flex  mobile:border-primary">
          <CgMenuGridO
            className={`${open ? `text-primary` : "text-white"}
          hidden mobile:block cursor-pointer`} size={45} onClick={handleOpen}/>
          <div className={` ${ open
        ? ` flex-col bg-header justify-center gap-y-4 rounded-2xl border-t-4 fixed bottom-[50px] w-full h-[40vh]  z-[999999999]`
        : "mobile:fixed -bottom-[60vh] md:px-8 py-1 items-center flex-row gap-1.5"
    }
        transition-height duration-700 ease-in-out flex items-center`}>
            <Link className="menuClass" to={"/movies"} onClick={handleClose}>
              Movies
            </Link>
            <Link className="menuClass" to={"/tv"} onClick={handleClose}>
              TV
            </Link>
           <ToggleTheme toggleTheme={toggleTheme} handleClose={handleClose}/>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Header;
