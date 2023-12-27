import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen centerd text-5xl  gap-3 ">
      <FaSpinner className="animate-spin" size={40}></FaSpinner>
      <span>Loading...</span>
    </div>
  );
};
export default Loading;
