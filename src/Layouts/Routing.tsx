import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import AuthGuard from "../components/AuthGuard";
const Film = lazy(() => import("../pages/film"));
const Login = lazy(() => import("../components/Login"));
const SignUp = lazy(() => import("../components/SignUp"));
const Landing = lazy(() => import("../pages/Landing"));
const Home = lazy(() => import("../pages/Home"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Season = lazy(() => import("../pages/Season"));
const Routing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthGuard
              authenticatedComponent={<Home />}
              unauthenticatedComponent={<Landing />}
            />
          }
        />
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
  );
};

export default Routing;
