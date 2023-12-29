import { Fragment, lazy,Suspense } from "react";
import { Routes, Route} from "react-router-dom";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import UserProfile from "../../components/User";
import Loading from "../../components/Loading";
import Home from "./Home";
const FilmDetails  = lazy(()=>import( "../FilmDetails"));
const Catalog = lazy(() =>import("../Catalog"));
const Season = lazy(() =>import("../Season"));
const Main = () => {
  return (
    <Fragment>
      <Header />
       <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/movie/:id" element={<FilmDetails mediaType="movie" />} />
        <Route path="/tv/:id" element={<FilmDetails mediaType="tv" />} />
        <Route path="/movies" element={<Catalog type="movie" />} />
        <Route path="/tv" element={<Catalog type="tv" />} />
        <Route path="/search" element={<Catalog type="search" />} />
        <Route path="/tv/:id/season/:seasonNumber" element={<Season />} />
        </Routes>
        </Suspense>
      <UserProfile />
      <Footer />
   </Fragment>
      );
};
export default Main;
