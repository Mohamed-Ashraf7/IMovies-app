import { Routes, Route } from "react-router-dom";
import { lazy ,Suspense} from "react";
import AuthGuard from "../components/AuthGuard";
import Home from "../pages/Home";
const Film =  lazy(() => import("../pages/film"))
const Loading = lazy(() => import("../components/Loading"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Season = lazy(() => import("../pages/Season"));
const Login = lazy(() => import("../components/Login"));
const SignUp = lazy(() => import("../components/SignUp"));
const Landing = lazy(() => import("../pages/Landing"));
const Header = lazy(() => import("../Layouts/Header"));
const Footer = lazy(() => import("../Layouts/Footer"));
const Routing = () => {
  return (
  <>
     <AuthGuard
            authenticatedComponent={<Header />}
            unauthenticatedComponent={<></>}/>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/*"
          element={
             <AuthGuard
                authenticatedComponent={<Home />}
                unauthenticatedComponent={<Landing />}
              />  } />
        <Route path="/movie/:id" element={<Film mediaType="movie" />}></Route>
        <Route path="/tv/:id" element={<Film mediaType="tv" />}></Route>
        <Route path="/movies" element={<Catalog type="movie" />}></Route>
        <Route path="/tv" element={<Catalog type="tv" />}></Route>
        <Route path="/search" element={<Catalog type="search" />}></Route>
        <Route path="/tv/:id/season/:seasonNumber" element={<Season />} />
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </Suspense>
     <AuthGuard
      authenticatedComponent={<Footer />}
      unauthenticatedComponent={<></>}/>
        </>
  );
};

export default Routing;
