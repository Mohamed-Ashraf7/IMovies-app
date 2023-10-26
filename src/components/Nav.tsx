import { Link } from "react-router-dom";
import logo from "../assets/3.webp";
export function Nav() {

  return (
    <nav
      className="left-0 right-0 sticky top-0 z-10 centerd h-[90px] w-full mobile:h-[74px] border-b-2
              bg-[#1a1a1a]  rounded-lg  mobile:px-6 px-20">
      <Link to="/*"
        className="-mt-2 md:mr-4 text-3xl text-center font-bold text-white md:mt-0 flex flex-row gap-x-2">
        <div className="h-[100%] w-[120px] rounded-sm">
          <img src={logo} alt="Logo" />
        </div>
        IMovies
      </Link>
      <div
        className="centerd w-full  mobileNav mobile:gap-6 ">
        <div className=" hidden mr-10 w-[calc(100%-30%)] items-center justify-center  lg:-ml-0 lg:flex">
          <Link to={"/*"} 
            className="delay-3  py-5  text-lg font-bold  transition-all ease-out text-white ">
            First . . . Let's Have an Account to Start our journy
          </Link>
        </div>
        <Link to="/SignUp"
          className="mobile:mr-2 mr-0 rounded-[5px] bg-primary px-6 py-4 mobile:py-3 text-md  text-white  md:mr-6  LoginBtn mainButton" >
          Sign up
        </Link>
        <Link to="/Login"
          className="rounded-sm px-6 py-3 text-sm  mobile:py-2  text-black bg-white   mainButton  hover:bg-primary LoginBtn hover:text-white ">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
