import { Fragment, lazy } from "react";
import { Routes, Route} from "react-router-dom";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import UserProfile from "../../components/User";
import Home from "./Home";
const Film =lazy(()=>import( "../Film"));
const Catalog = lazy(() =>import("../Catalog"));
const Season = lazy(() =>import("../Season"));
const Main = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/movie/:id" element={<Film mediaType="movie" />} />
        <Route path="/tv/:id" element={<Film mediaType="tv" />} />
        <Route path="/movies" element={<Catalog type="movie" />} />
        <Route path="/tv" element={<Catalog type="tv" />} />
        <Route path="/search" element={<Catalog type="search" />} />
        <Route path="/tv/:id/season/:seasonNumber" element={<Season />} />
      </Routes>
      <UserProfile />
      <Footer />
   </Fragment>
      );
};
export default Main;
