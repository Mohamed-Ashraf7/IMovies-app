import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebase";
import { useCallback, useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import { BiSolidUserCheck } from "react-icons/bi";
import bg from "../assets/paulina-milde-jachowska-lQV17pXAExE-unsplash.jpg";
import bg1 from "../assets/paulina-milde-jachowska-lQV17pXAExE-unsplash.jpg";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { AuthError } from "../Interfaces";
import { doc, setDoc } from "firebase/firestore";
import googleLogo from "../assets/icons8-google-48.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullname, setFullName] = useState("");
  const [error, setError] = useState<string>("");
  const [signedIn, setSignedIn] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const HanldeShow = () => {
    setError("");
  };
  const navigate = useNavigate();
  function getAuthStatus(err: AuthError) {
    switch (true) {
      case err.code === "auth/invalid-email":
        setError("Invalid email format");
        break;
      case err.code === "auth/user-disabled":
        setError("User account is disabled");
        break;
      case err.code === "auth/internal-error":
        setError("Internal Error occured, try again later");
        break;
      case err.code === "auth/email-already-in-use":
        setError("User already exists");
        break;
      case err.code === "auth/wrong-password":
        setError("Entered wrong password");
        break;
      default:
        setError("Unknown error occurred");
        break;
    }
  }
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const formValidation = useCallback(() => {
    if (
      (!isEmailValid(email) ||
        email.length === 0 ||
        pass.length < 5 ||
        fullname.length === 0,
      pass !== confirmPass)
    ) {
      setIsDisabled(true);
      setPasswordError("Password don't match");
    } else {
      setIsDisabled(false);
      setPasswordError("");
    }
  }, [email, fullname.length, confirmPass, pass]);
  function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (!isDisabled) {
      (async () => {
        try {
          // Create a new user account
          await createUserWithEmailAndPassword(auth, email, pass);
          setSignedIn(true);
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              await setDoc(doc(db, "users", user.uid), {
                email: email.toString(),
                fullname: fullname,
                uid: user.uid,
              });
              setTimeout(() => {
                navigate("/*");
              }, 1000);
            } else {
              window.alert("Unknown error occurred, try again?");
            }
          });
        } catch (err: any) {
          getAuthStatus(err);
        }
      })();
    } else {
      formValidation();
    }
  }
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          try {
            setSignedIn(true);
            navigate("/*");
          } catch (err) {
            window.alert(`Error:${err}, Failed to login in`);
          }
        }
      });
    } catch (err: any) {
      getAuthStatus(err);
    }
  };
  useEffect(() => {
    formValidation();
  }, [formValidation]);
  console.log("SignUp");
  return (
    <div
      className="flex items-center relative mobile:justify-center px-2 justify-start min-h-screen md:py-2"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <main className="flex items-center justify-center  lg:px-10 px-2 overflow-hidden ">
        <form className="bg-primary text-white shadow-lg shadow-black flex flex-col lg:w-[450px] w-screen h-[580px]justify-center items-center px-3 ">
          <Link
            to={"/*"}
            className="my-4 mt-7 mobile:my-2 text-4xl font-bold text-white"
          >
            I Movies
          </Link>
          <p>Create An Account</p>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <div className="flex space-x-4 my-2  text-2xl items-center justify-center">
            <div className=" border-white">
              <FaFacebook className="text-white" />
            </div>
            <div className=" border-white">
              <FaGithub className="text-white" />
            </div>
            <div className=" border-white">
              <FaGoogle className="text-white" />
            </div>
          </div>
          <input
            type="text"
            name="fullname"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="rounded-sm font-serif mt-4 text-black  shadow-black px-2 py-2 min-w-[280px] m-2 shadow-sm  focus:border-primary  focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="rounded-sm text-black font-serif  shadow-black px-2 py-2 min-w-[280px] m-2 shadow-sm  focus:border-primary  focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="rounded-sm text-black font-serif  shadow-black px-2 py-2 min-w-[280px] m-2 shadow-sm  focus:border-primary  focus:outline-none"
            required
          />
          <input
            type="password"
            name="confirmpassword"
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Enter your password again"
            className="rounded-sm text-black font-serif  shadow-black px-2 py-2 min-w-[280px] m-2 shadow-sm  focus:border-primary  focus:outline-none"
            required
          />
          {passwordError && <p className="text-black">{passwordError}</p>}
          <button
            onClick={() => signUp}
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled
                ? "cursor-not-allowed bg-black"
                : " text-gray-200 bg-blue-600"
            } m-3 text-white  w-2/4 rounded-sm px-4 py-3 shadow-sm shadow-black transition duration-200 ease-in"`}
          >
            Start Binging 🍿
          </button>
          <Link
            to="/Login"
            className="text-white hover:text-black my-1 text-sm font-medium cursor-pointer"
          >
            Have an account ? Login
          </Link>
          <div className="mx-auto my-4 h-[0.5px] w-full border-t-2 border-zinc-100 md:w-80">
            <p className="mx-auto flex items-center justify-center -mt-[20px] h-9 w-12  bg-blue-500 rounded-md text-sm ">
              OR
            </p>
          </div>
          <button
            onClick={() => signInWithGoogle}
            type="button"
            className="mx-auto my-2 rounded-md  border-white border-b-2 mb-4 flex h-12 w-full items-center justify-center  bg-white font-bold outline-none md:w-60 hover:bg-gray-300"
          >
            {" "}
            <p className="mr-4 text-sm my-1 font-semibold text-gray-800 ">
              Sign in with Google
            </p>
            <img src={googleLogo} alt="google" className="h-7 w-7" />
          </button>
        </form>
        <div
          className="w-[450px] h-[570px] hidden shadow-lg shadow-black py-10 lg:inline-flex flex-col items-center justify-between"
          style={{
            backgroundImage: `url(${bg1})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Link
            to={"/*"}
            className="lg:text-[90px] text-2xl   text-primary font-bold"
          >
            I Movies
          </Link>
          <p className="font-medium text-xl px-2 text-white text-center">
            Explore your interests, Meet new Movies & expand your horizons
          </p>
        </div>
      </main>
      {error && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
          <div className=" text-4xl text-white flex flex-col items-center gap-y-10 bg-red-700 opacity-[.96] shadow-black shadow-md absolut w-[450px] py-24 px-5 text-centerbg-black  text-center">
            {error}
            <button
              onClick={() => HanldeShow()}
              className="rounded-xl block border-none text-black bg-white px-7 py-4 text-base font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-8 mobile:py-5 mobile:text-lg mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {signedIn && (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
          <div className=" text-4xl text-white flex mobile:text-xl rounded-md flex-col items-center  gap-y-4 bg-[#00695c] opacity-[.96] shadow-black shadow-md absolut  py-20 px-5 text-center ">
            Signed up successfully! <BiSolidUserCheck size={40} />
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
