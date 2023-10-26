import bg from "../assets/bg1.webp";
import bg1 from "../assets/login-background.webp";
import image1 from "../assets/cta-logo-one.svg";
import image2 from "../assets/cta-logo-two.png";
import Nav from "../components/Nav";
import Footer from "../Layouts/Footer";
import { LatestMovies,Mail } from "../components/handling";
import { useState } from "react";

export function Landing() {
  const [show, setShow] = useState(false);
  const HanldeShow = () => {
    setShow(!show);
  };
  return (
    <div className="w-full bg-header text-light">
      <Nav />
      <div
        className="centerd min-h-screen bg-center bg-fixed gap-y-5 mobile:gap-y-5 mobile:bg-scroll relative w-full flex-col text-center bg-cover px-4 -mt-6 mobile:-mt-20 ease-in-out"
        style={{backgroundImage: `url(${bg1})`}}>
        <img src={image1} alt="imageone"
          className="w-full h-[100px] mobile:h-[70px]" />
        <h2 className="text-xl md:text-5xl border-b-[6px] py-2 rounded-md  border-primary font-extrabold  leading-snug text-white ">
          Bring unlimited Movies , TV Shows and more
        </h2>
        <p className="md:text-3xl text-lg">
          Watch Anywhere. Anytime. On any device
        </p>
        <img  src={image2} alt="imagetwo"
          className="w-[70%] mobile:w-full h-[50px] mobile:hidden block"/>
        <button onClick={() => HanldeShow()}
          className="mainButton rounded-md mt-2 bg-primary py-6 text-2xl mobile:px-4 mobile:py-4 " >
          Watch Now
        </button>
        <div className={`${
            show === true
              ? "centerd flex-col  fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50"
              : "hidden"}`}>
          <div className="rounded-md text-4xl centerd flex-col gap-y-10 bg-header  shadow-black shadow-md absolut w-[420px] py-24 px-4 text-center">
            Please Login First
            <button
              onClick={() => HanldeShow()}
              className=" mainButton rounded-xl block text-black bg-white py-4 text-base mobile:px-8 mobile:py-5  mt-4"
            > Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="centerd h-auto w-full mobile:flex-col-reverse gap-x-20   bg-header py-14  px-5">
        <div className="flex flex-col justify-center p-2 ">
          <h2 className="mb-6 text-center text-2xl font-extrabold md:text-left xl:text-4xl">
            Watch Anywhere , Anytime
          </h2>
          <p className="px-4 max-w-lg text-justify mobile:text-center text-sm  md:text-lg lg:text-2xl">
            Our website is optimized for viewing on all your devices. Whether
            you're on your desktop, laptop, tablet, or smartphone, you can enjoy
            the latest movies and trailers on-the-go
          </p>
        </div>
        <div className="h-60 w-[340px] md:h-auto md:w-auto">
          <img src={bg} alt="watching"
            className="mb-4 h-auto  border-[5px] border-black shadow-2xl shadow-black md:mb-0 md:w-[350px] xl:w-[450px]"
          />
        </div>
      </div>
      <LatestMovies />
      <Mail />
      <div className="bg-header h-[40px]"></div>
      <Footer />
    </div>
  );}
export default Landing;
