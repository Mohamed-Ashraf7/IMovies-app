import bg from "../assets/signup.webp";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../firebase";
import { useCallback, useEffect, useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import googleLogo from "../assets/icons8-google-48.png";
import { Handles, Socials,isEmailValid,handleAuthError } from "./handling";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fullname, setFullName] = useState("");
  const [error, setError] = useState<string | undefined | null>("");
  const [signedIn, setSignedIn] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const HanldeShowSign = () =>  setError("");
  const navigate = useNavigate();
  
  const formValidation = useCallback(() => {
    if (!isEmailValid(email) || email.length === 0
      || pass.length < 5 || fullname.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, fullname.length,pass]);

  const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            setSignedIn(true);
            navigate("/Login") 
        })
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
      className="flex items-center bg-cover bg-center relative mobile:justify-center px-2 justify-start min-h-screen md:py-2"
      style={{backgroundImage: `url(${bg})`}} >
      <main className="centerd  lg:px-10 px-2 overflow-hidden ">
        <form className="bg-primary text-white shadow-lg shadow-black centerd flex-col lg:w-[450px] w-screen h-[580px] px-3 ">
          <Link to={"/*"}
            className="my-4 mt-7 mobile:my-2 text-4xl font-bold text-white" >
            I Movies
          </Link>
          <p>Create An Account</p>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <Socials/>
          <input type="text" name="fullname" onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="inputSign" required />
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="inputSign" required />
          <input type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="inputSign" required/>
          <button onClick={signUp} type="submit" disabled={isDisabled}
            className={`${
              isDisabled
                ? "cursor-not-allowed bg-black"
                : " text-gray-200 bg-blue-600"
            } m-3 text-white  w-2/4  rounded-md px-4 py-3 shadow-sm shadow-black transition duration-200 ease-in"`} >
            Start Binging 🍿
          </button>
          <Link
            to="/Login"
            className="text-white hover:text-black my-1 text-sm font-medium cursor-pointer" >
            Have an account ? Login
          </Link>
          <div className="mx-auto my-4 h-[0.5px] w-full border-t-2 border-zinc-100 md:w-80">
            <p className="mx-auto centerd -mt-[20px] h-9 w-12  bg-blue-500 rounded-md text-sm ">
              OR</p>
          </div>
          <button onClick={signInWithGoogle} type="button"
            className="mx-auto my-2 rounded-md  border-white border-b-2 mb-4 centerd h-12 w-full bg-white font-bold outline-none md:w-60 hover:bg-gray-300">
            <p className="mr-4 text-sm my-1 font-semibold text-gray-800 ">
              Sign in with Google
            </p>
            <img src={googleLogo} alt="google" className="h-7 w-7" />
          </button>
        </form>
        <div
          className="w-[450px] h-[570px] bg-cover bg-center hidden shadow-lg shadow-black py-10 lg:inline-flex flex-col items-center justify-between"
          style={{
            backgroundImage: `url(${bg})`}}>
          <Link
            to={"/*"}
            className="lg:text-[90px] text-2xl text-primary font-bold">
            I Movies
          </Link>
          <p className="font-medium text-xl px-2 text-white text-center">
            Explore your interests, Meet new Movies & expand your horizons
          </p>
        </div>
      </main>
      <Handles error={error} HandleShow={HanldeShowSign} signedIn={signedIn}/>
    </div>
  );
};
export default SignUp;