import { createContext, useContext, useEffect, useState, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { getGenres } from "../api/tmdb-api";
import { Genre } from "../Interfaces";
import { MediaType } from "../Interfaces";
import { ThemeProvider } from "../api/Theme";
import Routing from "../Layouts/Routing";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import AuthGuard from "../components/AuthGuard";
const Loading = lazy(() => import("./Loading"));
const TOP = lazy(() => import("../components/Top"));
const UserProfile = lazy(() => import("../components/User"));
type Genres = {
  [key in MediaType]: Genre[];
};
export const GlobalContext = createContext<{
  genres: Genres;
}>({
  genres: {
    movie: [],
    tv: [],
  },
});

export const useGlobalContext = () => useContext(GlobalContext);

const App = () => {
  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  });

  const fetchGenres = async () => {
    const movie = await getGenres("movie");
    const tv = await getGenres("tv");
    setGenres({
      movie,
      tv,
    });
  };

  useEffect(() => {
    fetchGenres();
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const hrefAttribute = anchor.getAttribute("href");
        if (hrefAttribute) {
          const targetId = hrefAttribute.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });
  }, []);

  if (!genres.movie.length || !genres.tv.length) {
    return (
      <div className="fixed left-0 top-0 w-full min-h-screen right-0 bottom-0 flex items-center justify-center">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalContext.Provider value={{ genres }}>
          <TOP />
          <AuthGuard
            authenticatedComponent={<Header />}
            unauthenticatedComponent={<></>}
          />
          <Routing />
          <AuthGuard
            authenticatedComponent={<Footer />}
            unauthenticatedComponent={<></>}
          />
          <UserProfile />
        </GlobalContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
