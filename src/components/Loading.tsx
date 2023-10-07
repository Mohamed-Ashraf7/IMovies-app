import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="justify-center text-5xl flex items-center gap-3 my-5 ">
      <FaSpinner className="animate-spin" size={30}></FaSpinner>
      <span>Loading...</span>
    </div>
  );
};
export default Loading;
