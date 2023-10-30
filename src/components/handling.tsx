import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { BiSolidUserCheck } from "react-icons/bi";
import { AuthError } from "../Interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTheme } from "../api/Theme";
import Section from "./Section";
interface props {
  error: string | null | undefined;
  HandleShow: () => void;
  signedIn: boolean;
}
export const Socials = () => {
  return  <div className="centerd space-x-4 my-2  text-2xl ">
               <FaFacebook style={{ color: "#1877F2" }} />
               <FaGoogle style={{ color:"#999" }} />
               <FaGithub style={{ color: "#211F1F" }} />
          </div>
}
export const handleAuthError = (error:AuthError) => {
  let errorCode = '';
  switch (error.code) {
    case 'auth/email-already-in-use':
      errorCode = 'Email-Already-In-Use';
      break;
    case 'auth/invalid-email':
      errorCode = 'Invalid-Email';
      break;
    case 'auth/network-request-failed':
      errorCode = 'Auth/Network-Request-Failed';
      break;
    default:
      errorCode = 'Unknown-Error';
      break;
  }
  return errorCode;
};
export const LatestMovies = () => {
  const { theme } = useTheme();
  return (  <div
  className={`${ theme === "light" ? "": "bg-[#f3f4f6] text-dark"
  } centerd py-12 px-5 gap-x-20 mobile:px-6 w-full flex-col-reverse md:flex-row`}>
        <div className="m-auto my-2  w-auto centerd md:m-0 md:ml-10 md:h-auto md:w-auto">
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg"
            alt="watching1"
            className="mx-auto -mr-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
            alt="watching2"
            className="xl:h-68 z-[2] mx-auto h-56 w-[150px] shadow-2xl shadow-black md:-mt-0 md:h-64 md:w-44 xl:h-72 xl:w-48"
          />
          <LazyLoadImage
            src="https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg"
            alt="watching3"
            className="mx-auto -ml-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
        </div>
        <div className="flex flex-col justify-evenly p-3 pb-2 max-w-lg ">
          <h2 className="mb-4 text-center text-3xl font-extrabold  tex-center xl:text-4xl">
            Latest Releases
          </h2>
          <p className="text-lg md:px-0 text-justify mobile:text-center lg:text-2xl">
            Stay up-to-date with the latest news and gossip from Hollywood and
            beyond.
          </p>
        </div>
      </div>)
}
export const Mail = () => {
   const { theme } = useTheme();
  return (
   <Section
  className={`${theme === "light"? "bg-header text-light": "bg-[#f3f4f6] text-dark"
  } centerd mobile:flex-col my-14 gap-6 min-h-[270px]`}>
        <div>
          <h2 className="lg:text-[44px] text-2xl py-2  mobile:text-center">
            TRIAL START FIRST 30 DAYS.
          </h2>
          <p className="text-gray-500 text-center text-lg ">
            Enter your email to create or restart your membership
          </p>
        </div>
        <div className="flex flex-row items-center ">
          {" "}
          <input  type="email"
            className="w-[400px] mobile:w-[200px] p-4 text-black placeholder:text-gray-400 rounded-l-lg"
            placeholder="E-Mail . . . " />
          <button type="reset"
            className="bg-primary rounded-r-lg text-white  px-2 py-4 shadow-md hover:bg-blue-700 ">
            Continue{" "}
          </button>
        </div>
      </Section >
      )
}
  export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

export const Handles = ({error,HandleShow,signedIn }:props) => {
  return(
  <>
  {error && (
        <div className="centerd flex-col  fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
          <div className=" text-4xl text-white flex flex-col items-center gap-y-10 bg-red-700 opacity-[.96] shadow-black shadow-md w-[450px] py-24 px-5 text-center">
            {error}
            <button
              onClick={() => HandleShow()}
              className="rounded-xl block border-none text-black bg-white px-7 py-4 text-base font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-8 mobile:py-5 mobile:text-lg mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {signedIn && (
        <div className="centerd flex-col  fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className=" text-4xl text-white flex mobile:text-xl rounded-md flex-col items-center  gap-y-4 bg-[#00695c] opacity-[.96] shadow-black shadow-md  py-20 px-5 text-center ">
            Signed up successfully! <BiSolidUserCheck size={40} />
          </div>
        </div>
      )}</>
  )
}