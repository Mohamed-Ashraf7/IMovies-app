import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError } from "../Interfaces";
import { BiSolidUserCheck } from "react-icons/bi";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import bg from "../assets/pexels-pavel-danilyuk-7234381.jpg";
import bg1 from "../assets/pexels-pavel-danilyuk-7234246.jpg";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import googleLogo from "../assets/icons8-google-48.png";

const Login = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState<string | undefined | null>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HanldeShow = () => {
    setError("");
  };
  const handleAuthError = (err: AuthError) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address");
        break;
      case "auth/user-not-found":
        setError("User not found");
        break;
      case "auth/wrong-password":
        setError("Incorrect password");
        break;
      case "auth/invalid-login-credentials":
        setError("Invalid Email or password");
        break;
      default:
        setError("Unknown error occurred");
        break;
    }
  };

  //Form Validation Function
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const formValidation = useCallback(() => {
    if (!isEmailValid(email) || password.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password.length]);

  const logIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          setTimeout(() => {
            navigate("/*");
          }, 1000);
        }
      });
    } catch (err: any) {
      handleAuthError(err);
      console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/*");
        } else {
          navigate("/Login");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    formValidation();
  }, [formValidation]);
  
  return (
    <div
      className="flex items-center relative justify-end mobile:justify-center min-h-screen md:py-2"
      style={{
        backgroundImage: `linear-gradient(270deg, #000, #0005) , url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <main className="flex items-center justify-center  px-2 overflow-hidden md:px-10">
        <div
          className="w-[450px] h-[570px] hidden shadow-lg py-10 lg:mt-4 shadow-black  lg:inline-flex flex-col items-center justify-between "
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Link
            to={"/*"}
            className="lg:text-[80px] text-2xl   align-center   text-white font-bold"
          >
            I Movies
          </Link>
          <p className="font-medium text-xl px-2 text-gray-100 text-center">
            Explore your interests, Meet new Movies & expand your horizons
          </p>
        </div>
        <form className="bg-white rounded-sm lg:mt-4 shadow-lg shadow-black  flex flex-col md:w-[450px] h-[570px] w-screen items-center justify-center  transition duration-1000 ease-out">
          <Link to={"/*"} className="mt-6 mb-3 text-4xl font-bold text-primary">
            I Movies
          </Link>
          <div className="inline-block border-[1px] justify-center w-20 border-primary border-solid"></div>
          <h3 className="text-xl font-semibold text-blue-600 pt-2">Sign In!</h3>
          <div className="flex space-x-3  mb-5 mt-2 items-center text-2xl justify-center">
            <div className="socialIcon">
              <FaFacebook style={{ color: "#1877F2" }} />
            </div>
            <div className="socialIcon">
              <FaGithub style={{ color: "#211F1F" }} />
            </div>
            <div className="socialIcon">
              <FaGoogle style={{ color: "rgb(211 47 47 )" }} />
            </div>
          </div>
          <input
            type="email"
            name="email"
            className="rounded-sm px-2 py-2 min-w-[280px] text-black border-[1px] border-blue-400 m-2 mt-5 shadow-md shadow-gray-400 focus:shadow-2xl focus:border-primary focus:outline-none"
            placeholder="your E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" your password"
            className="rounded-sm px-2 py-2 min-w-[280px] text-black border-[1px] border-blue-400 m-2 mb-5 shadow-md shadow-gray-400 focus:shadow-2xl focus:border-primary focus:outline-none"
            required
          />
          <button
            onClick={logIn}
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled ? "cursor-not-allowed " : "bg-black text-gray-200"
            } rounded-sm m-2 text-white bg-blue-600 w-2/5 px-2 py-2 shadow-md shadow-black hover:bg-primary transition duration-200 ease-in"`}
          >
            Continue Binging
          </button>
          <Link
            to="/SignUp"
            className="text-primary hover:text-blue-500 mb-6 mt-2 text-sm font-medium cursor-pointer"
          >
            Don't have an account ?
          </Link>
          <div className="mx-auto my-3 h-[0.5px] w-full border-t-2 border-zinc-700 md:w-80">
            <p className="mx-auto flex items-center justify-center -mt-[20px] h-8 w-10  bg-blue-500 rounded-md text-base ">
              OR
            </p>
          </div>
          <button
            onClick={signInWithGoogle}
            type="button"
            className="mx-auto hover:rounded-md bg-white my-3 hover:border-black hover:border-b-4 mb-3 flex h-8 w-full items-center justify-center  font-bold outline-none md:w-80"
          >
            {" "}
            <p className="mr-3 text-base  font-semibold text-gray-600  ">
              Sign in with Google
            </p>
            <img src={googleLogo} alt="google" className="h-7 w-7" />
          </button>
        </form>
      </main>
      {/* Add a div for displaying error or success message  */}
      {error && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className=" text-4xl text-white flex mobile:text-xl rounded-md flex-col items-center  gap-y-4 bg-[#c62828] opacity-[.96] shadow-black shadow-md absolut  py-20 px-5 text-center ">
            {error}
            <button
              onClick={() => HanldeShow()}
              className="rounded-md shadow-black shadow-md block border-none text-black bg-white px-7 py-4 text-base font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-8 mobile:py-5 mobile:text-lg mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className=" text-4xl text-white flex mobile:text-xl rounded-md flex-col items-center  gap-y-4 bg-[#00695c] opacity-[.96] shadow-black shadow-md absolut  py-20 px-5 text-center ">
            Signed up successfully! <BiSolidUserCheck size={40} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;