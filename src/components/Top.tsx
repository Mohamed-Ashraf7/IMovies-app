import { useState, useEffect } from "react";
import { GiReturnArrow } from "react-icons/gi";
const TOP = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 50);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed right-5 bottom-5  mobile:bottom-4 mobile:rotate-0 z-[9999] rotate-6 bg-white rounded-lg  shadow-white shadow-sm hover:bg-blue-gray-700">
          <button
            onClick={scrollToTop}
            className="md:p-3 p-4  text-white text-sm md:text-3xl flex flex-col justify-center"
          >
            <GiReturnArrow className="text-primary rotate-45" />
          </button>
        </div>
      )}
    </>
  );
};

export default TOP;
