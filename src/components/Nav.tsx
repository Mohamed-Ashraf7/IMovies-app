import { Link } from "react-router-dom";
import logo from "../assets/3.png";
export function Nav() {
  return (
    <nav
      className="left-0 sticky top-0 z-10 flex h-20 w-full mobile:rounded-2xl mobile:border-b-2
             items-center justify-center bg-[#1a1a1a]  rounded-xl  mobile:gap-x-2 transition-all delay-[3] ease-out mobile:px-8 px-20"
    >
      <Link
        to="/*"
        className="-mt-2 md:mr-4 text-3xl text-center font-bold text-white md:mt-0 flex flex-row gap-x-2"
      >
        <div className="h-[100%] w-[120px] rounded-sm ">
          <img src={logo} alt="Logo" />
        </div>
        IMovies
      </Link>
      <div
        className="flex w-full items-center justify-center mobile:rounded-xl
            mobile:fixed
            mobile:bottom-0
            mobile:left-0
            mobile:right-0
            mobile:justify-center
            mobile:py-3
            mobile:bg-[#0a0a0a]
            mobile:gap-6
            mobile:border-t-2
            border-primary"
      >
        <div className=" hidden mr-10 w-[calc(100%-30%)] items-center justify-center  lg:-ml-0 lg:flex">
          <Link
            to={"/*"} // Link to the Landing page
            className="delay-3  py-5  text-lg font-bold  transition-all ease-out text-white shadow-[0px_2px_0px_#D32F2F]"
          >
            First . . . Let's Have an Account to Start our journy
          </Link>
        </div>
        <Link
          to="/SignUp"
          className="delay-3 -mt-1 mobile:mr-2 mr-0 whitespace-nowrap rounded-[5px] bg-primary px-7 py-4 text-md font-bold text-white transition-all ease-out hover:bg-zinc-600  md:mr-6 md:mt-1"
        >
          Sign up
        </Link>
        <Link
          to="/Login"
          className="delay-3 -mt-1 whitespace-nowrap rounded-[4px] border-[1px] border-white px-6 py-3 text-sm font-bold text-black bg-white  transition-all ease-out hover:mx-2 hover:scale-110 hover:border-none hover:bg-primary hover:text-white md:mt-1.5"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;