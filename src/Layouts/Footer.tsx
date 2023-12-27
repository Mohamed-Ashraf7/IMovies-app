import { MdFacebook } from "react-icons/md";
import { IoLogoGithub, IoLogoTwitter, IoLogoInstagram } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Footer = () => {
  return (
    <footer
      className="centerd py-8 border-t-4 rounded-xl bg-[#0a0a0a] md:px-16 mobile:pt-2 mobile:pb-20"
      >
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 justify-center">
        <div className="col-span-2 hidden lg:block">
          <ul className="flex space-x-7 justify-center text-xl text-light">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Watch List</li>
          </ul>
          <p className="text-[#4a4a4a] text-center mt-8">
            © 2023 IMovies. All Rights Reserved. All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="text-white text-xl text-center">Follow Us</h3>
          <div className="centerd  space-x-3  my-4">
            <MdFacebook style={{ color: "#1877f2", fontSize: "2.5rem" }} />
            <IoLogoGithub style={{ color: "#222", fontSize: "2.5rem" }} />
            <IoLogoInstagram style={{ color: "#e4405f", fontSize: "2.5rem" }} />
            <IoLogoTwitter style={{ color: "#1da1f2", fontSize: "2.5rem" }} />
          </div>
        </div>
        <div>
          <h3 className="text-white text-center text-xl">IMovies App</h3>
          <div className="centerd gap-x-2 my-3 text-sm ">
            <LazyLoadImage
              className="w-auto h-full"
              src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png"
              alt="App Store"/>
            <span className="text-neutral-500">App Store</span>
            <LazyLoadImage
               className="w-auto h-full"
              src="https://img.icons8.com/fluency/48/000000/google-play.png"
              alt="Google Play Store"/>
            <span className="text-neutral-500">Google Play Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
