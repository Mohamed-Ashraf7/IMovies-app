import { Link } from "react-router-dom";
import logo from "../../assets/3.webp";
export function Nav() {

  return (
    <nav
      className="centerd sticky top-0 z-50 h-[85px] w-full mobile:h-[74px] border-b-2 bg-dark rounded-lg mobile:px-6 px-20">
      <Link to="/*"
        className="text-3xl font-bold text-white flex flex-row gap-x-10 ">
        <div className="h-auto w-[120px]">
          <img src={logo} alt="Logo" className="h-auto w-[120px]"/>
        </div>
        <span> IMovies</span>
      </Link>
      <div
        className="centerd w-full mobileNav mobile:gap-6 ">
        <div className="hidden w-full xl:centerd">
          <span  
            className="text-lg font-bold">
            First . . . Let's Have an Account to Start our journy
          </span>
        </div>
        <Link to="/SignUp"
          className="mobile:mr-2 mr-0 whitespace-nowrap bg-primary py-4 text-base text-white md:mr-6 mainButton">
          Sign up
        </Link>
        <Link to="/Login"
          className="text-sm py-3 text-black bg-white hover:bg-primary mainButton hover:text-white">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
