import React, { useState} from "react";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../api/AuthContext";

const UserProfile = React.memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const { user, signOut } = useAuth();
  const hanldeLogOut = () => {
    setShowLog((prev)=>!prev);
  };
 if (!user) {
    return null;
  }
  return (
    <>
      {user &&
         <div
      className="fixed left-3 bottom-5 mobile:bottom-3 z-[9999] bg-white rounded-xl shadow-white shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <button
        className="md:p-3 p-4 text-white text-sm md:text-3xl flex flex-col justify-center relative"
        onClick={()=>hanldeLogOut()}>
        <FaUserAlt className={isHovered ? "text-primary" : "text-black"} />
        {isHovered && (
          <span className="absolute -top-7 mobile:-top-10 w-[90px] -left-3 right-0 text-white text-sm text-center py-1 ">
            Log Out
          </span>
        )}
        </button>
        </div>}
      <div
        className={`${showLog ? "centerd fixed" : "hidden"} top-0 left-0 mx-auto w-full h-full bg-black bg-opacity-70 z-50`}>
        <div className="rounded-lg text-4xl text-white flex flex-col items-center gap-y-10 bg-header mx-auto mobile:w-[95%] shadow-black shadow-md absolute w-[450px] py-24 px-10 text-center">
          Log Out
          <div className="flex items-center flex-row gap-x-2 justify-center">
             <button
              onClick={()=>hanldeLogOut()}
              className="rounded-lg  text-white bg-primary px-5 py-3 text-xl mainButton mobile:py-2 mobile:px-5 mt-4 ">
              Cancel
            </button>
          <button
  onClick={() => signOut()} 
  className="rounded-lg text-black bg-white px-7 py-3 text-md mainButton mobile:py-3 mt-4">
  OK
</button>

          </div>
        </div>
      </div>
      
      </>
  );
});
export default UserProfile;
