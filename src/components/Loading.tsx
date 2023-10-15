import { FaSpinner } from "react-icons/fa";
import { memo } from "react";
const Loading = memo(() => {
  return (
    <div className="text-5xl flex items-center justify-center gap-3 my-10 ">
      <FaSpinner className="animate-spin" size={30}></FaSpinner>
      <span>Loading...</span>
    </div>
  );
});
export default Loading;
