import { useEffect,useState} from "react";
import logo from "../assets/3.webp";
import Container from "../components/Container";
import { ToggleTheme, useTheme } from "../context/Theme";
import {Link} from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { SearchResult } from "../components/SearchResult";

const Header = () => {
  
  const { toggleTheme } = useTheme();
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
 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={` lg:backdrop-blur-sm sticky top-0 z-[99] ${
        show === "scrolled" ? "bg-black bg-opacity-[.8]" : ""}`}>
      <Container className="mobile:px-6 flex items-center justify-between gap-2 ">
        <Link to={"/*"} className="flex items-center justify-between gap-6 ">
          <img src={logo} alt="Logo" className="h-[100%] w-[120px] rounded-sm " />
          <h1 className="text-3xl mobile:text-xl font-semibold text-white hidden lg:block">
            IMovies
          </h1>
          </Link>
            <SearchResult />
          <div className="mobileNav centerd mobile:border-primary">
          <CgMenuGridO
            className={`${open ? `text-primary` : "text-white"}
          hidden mobile:block cursor-pointer`} size={45} onClick={handleOpen}/>
         <div
        className={`${open
         ? "flex-col bg-header justify-center gap-y-4 rounded-2xl border-t-4 fixed bottom-[50px] w-full h-[40vh] z-[999999999] transition-height duration-700 ease-in-out"
         : "mobile:fixed -bottom-[60vh] md:px-8 py-1 items-center flex-row gap-1.5"
        } flex items-center`}
        >
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
