import { MdFacebook } from "react-icons/md";
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram } from "react-icons/io";
import bg_footer from "../assets/auke-bakker-CTTJHNwbtPg-unsplash.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Footer = () => {
  return (
    <footer
      className="py-16 px-16 mobile:pt-5  mobile:pb-20 flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(270deg,#000,#0009) , url(${bg_footer})`,
        backgroundPosition: "100% 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container grid lg:grid-cols-4 grid-cols-1  justify-center">
        <div className="box col-span-2 hidden lg:block">
          <ul className="flex space-x-7 justify-center  text-xl text-light">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Watch List</li>
          </ul>
          <p className="text-gray-300 text-center mt-8">
            © 2023 IMovies. All Rights Reserved. All videos and shows on this
            platform are trademarks of, and all related images and content are
            the property of, Streamit Inc. Duplication and copy of this is
            strictly prohibited. All rights reserved.
          </p>
        </div>
        <div className="box  mobile:my-2">
          <h3 className="text-white text-xl text-center">Follow Us</h3>
          <div className="flex items-center  space-x-3 justify-center my-8">
            <MdFacebook style={{ color: "#1877f2", fontSize: "2.5rem" }} />
            <IoLogoGithub style={{ color: "#333", fontSize: "2.5rem" }} />
            <IoLogoInstagram style={{ color: "#e4405f", fontSize: "2.5rem" }} />
            <IoLogoTwitter style={{ color: "#1da1f2", fontSize: "2.5rem" }} />
          </div>
        </div>
        <div className="box">
          <h3 className="text-white text-center text-xl">IMovies App</h3>
          <div className="flex items-center  space-x-2 my-6">
            <LazyLoadImage
              src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png"
              alt="App Store"
            />
            <span className="text-gray-300">App Store</span>
            <LazyLoadImage
              src="https://img.icons8.com/fluency/48/000000/google-play.png"
              alt="Google Play Store"
            />
            <span className="text-gray-300">Google Play Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
