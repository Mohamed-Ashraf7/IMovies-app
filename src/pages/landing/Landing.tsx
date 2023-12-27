import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Nav from "./Nav";
import bg from "../../assets/bg1.webp";
import image1 from "../../assets/cta-logo-one.svg";
import image2 from "../../assets/cta-logo-two.png";
import bg1 from "../../assets/login-background.webp";
import { LatestMovies , Mail } from "./Latest";
import Footer from "../../Layouts/Footer";

const Landing = () => {
   const [show, setShow] = useState(false);
  const HanldeShow = () => {
    setShow(!show);
  };
  
  return (
    <div className=" bg-header text-light">
      <Nav />
      <div
        className="centerd flex-col text-center min-h-screen bg-center bg-fixed gap-y-5 mobile:bg-scroll relative  bg-cover px-4 -mt-6 mobile:-mt-20"
        style={{backgroundImage: `url(${bg1})`}}>
        <img src={image1} alt="imageone"
          className="w-full h-[100px] mobile:h-[70px]" />
        <h2 className="text-5xl mobile:text-xl border-b-[6px] py-2 rounded-md border-primary font-extrabold">
          Bring unlimited Movies , TV Shows and more
        </h2>
        <p className="text-3xl mobile:text-lg">
          Watch Anywhere. Anytime. On any device
        </p>
        <img  src={image2} alt="imagetwo"
          className="w-auto h-full mobile:hidden block "/>
        <button onClick={() => HanldeShow()}
          className="mainButton rounded-md mt-2 bg-primary py-6 text-lg">
          Watch Now
        </button>
        <div className={`${
            show === true
              ? "centerd flex-col fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50"
              : "hidden"}`}>
          <div className="rounded-md text-4xl centerd flex-col gap-y-10 bg-header shadow-black shadow-md w-[420px] py-24 px-4">
            Please Login First
            <button
              onClick={() => HanldeShow()}
              className="mainButton rounded-xl text-black bg-white py-4 text-base mt-4"
            > Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="centerd h-auto  mobile:flex-col-reverse gap-x-20 bg-header py-12 px-5">
        <div className="flex flex-col justify-center gap-y-5">
          <p className=" text-center text-2xl font-extrabold xl:text-4xl">
            Watch Anywhere , Anytime
          </p>
          <p className="px-4 max-w-xl text-justify mobile:text-center text-base lg:text-xl">
            Our website is optimized for viewing on all your devices. Whether
            you're on your desktop, laptop, tablet, or smartphone, you can enjoy
            the latest movies and trailers on-the-go
          </p>
        </div>
        <div className="h-auto w-auto px-2">
          <LazyLoadImage src={bg} alt="Watching"
            className="mobile:mb-4 h-auto w-full border-[5px] border-black shadow-2xl shadow-black lg:w-[420px]"
          />
        </div>
      </div>
      <div className="bg-header">
      <LatestMovies />
      </div>
      <Mail />
      <div className="bg-header h-[20px]"></div>
      <Footer />
    </div>
  );}

export default Landing;
