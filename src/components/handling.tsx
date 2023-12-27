import { Fragment } from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { BiSolidUserCheck } from "react-icons/bi";
import { AuthError } from "../Interfaces";

interface props {
  error: string | null | undefined;
  HandleShow: () => void;
  signedIn: boolean;
}
export const Socials = () => {
  return (
    <div className="centerd space-x-4 my-2 text-2xl ">
       <FaFacebook style={{ color: "#1877F2" }} />
       <FaGoogle style={{ color:"#999" }} />
       <FaGithub style={{ color: "#211F1F" }} />
    </div>
)}
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
    case 'auth/invalid-login-credentials':
      errorCode = 'please check your Email and password again';
      break;
    default:
      errorCode = 'Unknown-Error';
      break;
  }
  return errorCode;
};

  export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

export const Handles = ({error,HandleShow,signedIn }:props) => {
  return(
  <Fragment>
     {(error || signedIn) && (
        <div className="centerd flex-col fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
         {error && (
          <div className="flex flex-col items-center rounded-md text-2xl text-white  gap-y-10 bg-red-800 shadow-black w-[400px] shadow-md py-16 px-5 text-center">
            {error}
            <button
              onClick={() => HandleShow()}
              className="shadow-sm mainButton text-black bg-white text-base py-6"
            >
              Cancel
            </button>
          </div>)}
        {signedIn && (
           <div className="text-4xl text-white flex mobile:text-xl rounded-md flex-col items-center  gap-y-4 bg-[#00695c] opacity-[.96] shadow-black shadow-md  py-20 px-5 text-center ">
             Signed up successfully! <BiSolidUserCheck size={40} />
           </div>
        )}
          </div>
      )}
     </Fragment>
  )
}