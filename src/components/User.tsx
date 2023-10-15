import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";

const UserProfile = React.memo(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [show, setShow] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/*");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("User");
  const HanldeShow = () => {
    setShow(!show);
  };
  if (!user) {
    return null;
  }
  return (
    user && (
      <div
        className="fixed left-3 bottom-5 mobile:bottom-3 z-[9999] bg-white rounded-xl  shadow-white shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="md:p-3 p-4 text-white text-sm md:text-3xl flex flex-col justify-center relative"
          onClick={() => HanldeShow()}
        >
          <FaUserAlt
            className={`${isHovered === true ? "text-primary" : "text-black"}`}
          />
          {isHovered && (
            <span className="absolute -top-7 mobile:-top-10 w-[90px] -left-3 right-0 text-white text-sm text-center py-1 md:px-8">
              Log Out
            </span>
          )}
        </button>
        <div
          className={`${
            show === true
              ? "flex flex-col items-center justify-center fixed top-0 left-0 mx-auto w-full h-full bg-black bg-opacity-70 z-50"
              : "hidden"
          }`}
        >
          <div className="text-4xl text-white flex flex-col items-center gap-y-10 bg-header mx-auto mobile:w-[95%]  shadow-black shadow-md absolut w-[400px] py-24 px-10 text-centerbg-black text-center">
            Log Out
            <div className="flex items-center flex-row gap-x-2 justify-center">
              <button
                onClick={() => HanldeShow()}
                className="rounded-xl block border-none text-white bg-primary px-7 py-4 text-md font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-4 mobile:py-2  mt-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSignOut()}
                className="rounded-xl block border-none text-black bg-white px-7 py-4 text-md font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-4 mobile:py-3  mt-4"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
});

export default UserProfile;
