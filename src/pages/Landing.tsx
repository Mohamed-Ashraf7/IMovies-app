import bg from "../assets/bg1.jpg";
import bg1 from "../assets/login-background.jpg";
import Nav from "../components/Nav";
import image1 from "../assets/cta-logo-one.svg";
import image2 from "../assets/cta-logo-two.png";
import Footer from "../Layouts/Footer";
import Section from "../components/Section";
import { useState } from "react";
export function Landing() {
  const [show, setShow] = useState(false);
  const HanldeShow = () => {
    setShow(!show);
  };
  return (
    <div className=" w-full bg-header text-light">
      <Nav />
      <div
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex min-h-screen bg-fixed gap-y-5 mobile:bg-scroll relative w-full flex-col items-center justify-center text-center bg-cover px-4 -mt-6 mobile:-mt-16 ease-in-out"
      >
        <img src={image1} alt="image1" className="w-full h-[100px]" />

        <h2 className="text-3xl md:text-5xl border-b-[6px] py-2 rounded-md  border-primary font-extrabold  leading-snug text-white ">
          Bring unlimited Movies , TV Shows and more
        </h2>
        <p className="md:text-3xl text-2xl">
          Watch Anywhere. Anytime. On any device
        </p>
        <img
          src={image2}
          alt="image1"
          className="w-[70%] mobile:w-full h-[50px]"
        />
        <button
          onClick={() => HanldeShow()}
          className="rounded-md shadow-lg mt-2 shadow-black border-none bg-primary px-7 py-6 text-2xl font-extrabold  transition-all delay-[1] ease-in hover:scale-110  hover:shadow-2xl hover:shadow-teal-500 mobile:px-8 mobile:text-lg"
        >
          Watch Now
        </button>
        <div
          className={`${
            show === true
              ? "flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50"
              : "hidden"
          }`}
        >
          <div className=" text-4xl flex flex-col items-center gap-y-10 bg-header  shadow-black shadow-md absolut w-[420px] py-24 px-4 text-centerbg-black  text-center">
            Please Login First
            <button
              onClick={() => HanldeShow()}
              className="rounded-xl block border-none text-black bg-white px-7 py-4 text-md font-extrabold transition-all delay-[1] ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 mobile:px-8 mobile:py-5 mobile:text-lg mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-auto w-full mobile:flex-col-reverse gap-x-20  items-center justify-center bg-header py-14  px-5">
        <div className="flex flex-col justify-center p-4 ">
          <h2 className="mb-6 text-center text-2xl font-extrabold md:text-left xl:text-4xl">
            Watch Anywhere , Anytime
          </h2>
          <p className="px-4 max-w-lg text-justify text-sm  md:text-lg lg:text-2xl">
            Our website is optimized for viewing on all your devices. Whether
            you're on your desktop, laptop, tablet, or smartphone, you can enjoy
            the latest movies and trailers on-the-go
          </p>
        </div>
        <div className="h-60 w-80 md:h-auto md:w-auto">
          <img
            src={bg}
            alt="watching"
            className="mb-4 h-auto w-80 border-[5px] border-black shadow-2xl shadow-black md:mb-0 md:w-[350px] xl:w-[450px]"
          />
        </div>
      </div>
      <div className="flex py-12  px-5 gap-x-20 mobile:px-6 w-full flex-col-reverse items-center justify-center bg-[#1a1a1a]   md:flex-row  ">
        <div className="m-auto my-2 flex w-auto items-center justify-center md:m-0 md:ml-6 md:h-auto md:w-auto">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg"
            alt="watching"
            className="mx-auto -mr-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
            alt="watching"
            className="xl:h-68 z-[2] mx-auto h-56 w-[150px] shadow-2xl shadow-black md:-mt-0 md:h-64 md:w-44 xl:h-72 xl:w-48"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg"
            alt="watching"
            className="mx-auto -ml-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44"
          />
        </div>
        <div className="flex flex-col justify-evenly p-4 pb-2 max-w-lg ">
          <h2 className="mb-4 text-center text-3xl font-extrabold  tex-center xl:text-4xl">
            Latest Releases
          </h2>
          <p className="text-lg md:px-0 text-justify lg:text-2xl">
            Stay up-to-date with the latest news and gossip from Hollywood and
            beyond.
          </p>
        </div>
      </div>
      <Section className="flex mobile:flex-col my-14 bg-black items-center justify-between min-h-[250px]">
        <div>
          <h2 className="text-[44px] mobile:text-2xl text-white mobile:text-center">
            TRIAL START FIRST 30 DAYS.
          </h2>
          <p className="text-gray-300 text-center text-lg">
            Enter your email to create or restart your membership
          </p>
        </div>
        <div className="flex flex-row items-center ">
          {" "}
          <input
            type="email"
            className="w-[400px] mobile:w-[200px] p-4 text-black placeholder:text-gray-400 rounded-l-xl"
            placeholder="E-Mail . . . "
          />
          <button
            type="reset"
            className="bg-primary rounded-r-xl  text-whitemobile:py-1 px-2 py-4 shadow-md hover:bg-blue-700 "
          >
            Continue{" "}
          </button>
        </div>
      </Section>
      <div className="bg-header h-[40px]"></div>
      <Footer />
    </div>
  );
}
export default Landing;
