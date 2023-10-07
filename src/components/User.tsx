import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { User } from "firebase/auth";
import { FaUserAlt } from "react-icons/fa";
const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    user && (
      <div
        className="fixed left-3 bottom-5 mobile:bottom-24 z-[9999] bg-white rounded-2xl  shadow-white shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="md:p-3 p-4 text-white text-sm md:text-3xl flex flex-col justify-center relative"
          onClick={handleSignOut}
        >
          <FaUserAlt
            className={`${isHovered === true ? "text-primary" : "text-black"}`}
          />
          {isHovered && (
            <span className="absolute -top-7 w-[90px] -left-3 right-0 text-white text-sm text-center py-1 ">
              Log Out
            </span>
          )}
        </button>
      </div>
    )
  );
};

export default UserProfile;
