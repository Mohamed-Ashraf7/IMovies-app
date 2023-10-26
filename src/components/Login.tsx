import googleLogo from "../assets/icons8-google-48.png";
import bg from "../assets/loginTwo.webp";
import bg1 from "../assets/loginOne.webp";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import { Handles, Socials,isEmailValid ,handleAuthError} from "./handling";
import { useAuth } from "../api/AuthContext";
const Login = () => {
   const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState<string | undefined | null>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HanldeShowLogin = () => setError("");


  const formValidation = useCallback(() => {
    if (!isEmailValid(email) || password.length < 5) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password.length]);
  
  const logIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  setError(null);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      setLoggedIn(true);
      setTimeout(() => {
      navigate("/*");
      }, 2000);
    }
  } catch (err: any) {
    const handleError = handleAuthError(err);
    setError(handleError);
    console.error("Error during login:", err);
  }
};
  useEffect(() => {
    formValidation();
  }, [formValidation]);
  return (
    <div
      className="flex items-center bg-cover bg-center relative justify-end mobile:justify-center min-h-screen md:py-2"
      style={{backgroundImage: `linear-gradient(270deg, #000, #0005) , url(${bg})`,}}>
      <main className="centerd px-2 overflow-hidden md:px-10">
        <div
          className="w-[450px] h-[570px] hidden bg-center bg-cover shadow-lg py-10 lg:mt-4 shadow-black  lg:inline-flex flex-col items-center justify-between "
          style={{backgroundImage: `url(${bg1})`}}>
          <Link
            to={"/*"}
            className="lg:text-[80px] text-2xl align-center text-white font-bold">
            I Movies
          </Link>
          <p className="font-medium text-xl px-2 text-gray-100 text-center">
            Explore your interests, Meet new Movies & expand your horizons
          </p>
        </div>
        <form className="bg-white rounded-sm lg:mt-4 shadow-lg shadow-black  centerd flex-col md:w-[450px] h-[570px] w-screen  transition duration-1000 ease-out">
          <Link to={"/*"} className="mt-6 mb-3 text-4xl font-bold text-primary">
            I Movies
          </Link>
          <div className="inline-block border-[1px] justify-center w-20 border-primary border-solid"></div>
          <h3 className="text-xl font-semibold text-blue-600 pt-2">Sign In!</h3>
         <Socials/>
          <input type="email" name="email" className="inputLogin" placeholder="your E-mail"
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
            placeholder=" your password" className="inputLogin"required/>
          <button onClick={logIn} type="submit" disabled={isDisabled} className={`${
              isDisabled ? "cursor-not-allowed " : "bg-black text-gray-200"
            } rounded-md m-2 text-white bg-blue-600 w-2/4 px-2 py-3 shadow-md shadow-black hover:bg-primary transition duration-200 ease-in"`} >
            Continue Binging
          </button>
          <Link
            to="/SignUp"
            className="text-primary hover:text-blue-500 mb-6 mt-2 text-sm font-medium cursor-pointer">
            Don't have an account ?
          </Link>
          <div className="mx-auto my-3 h-[0.5px] w-full border-t-2 border-zinc-700 md:w-80">
            <p className="mx-auto centerd -mt-[20px] h-8 w-10  bg-blue-500 rounded-md text-base ">
              OR</p>
          </div>
          <button
            onClick={signInWithGoogle} type="button"
            className="mx-auto hover:rounded-md bg-white my-3 hover:border-black hover:border-b-4 mb-3 centerd h-8 w-full font-bold outline-none md:w-80">
            <p className="mr-3 text-base  font-semibold text-gray-600  ">
              Sign in with Google
            </p>
            <img src={googleLogo} alt="google" className="h-7 w-7" />
          </button>
        </form>
      </main>
      <Handles error={error} HandleShow={HanldeShowLogin} signedIn={loggedIn}/>
    </div>
  );
};
export default Login;