import { createContext, useContext, useEffect, useState, lazy} from "react";
import { BrowserRouter } from "react-router-dom";
import { getGenres } from "../api/tmdb-api";
import { Genre } from "../Interfaces";
import { MediaType } from "../Interfaces";
import { ThemeProvider } from "../api/Theme";
import { AuthProvider } from "../api/AuthContext";
const TOP = lazy(() => import("../components/Top"));
const Routing=lazy(()=>import("../Layouts/Routing")) ;
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

  const fetchGenres =  async () => {
    const movie = await getGenres("movie");
    const tv = await getGenres("tv");
    setGenres({
      movie,
      tv,
    });
  };
  useEffect(() => {
    fetchGenres();
  }, []);
 
  return (
      <BrowserRouter>
      <AuthProvider>
      <ThemeProvider>
        <GlobalContext.Provider value={{ genres }}>
          <TOP />
          <Routing />
       </GlobalContext.Provider>
     </ThemeProvider>
     </AuthProvider>
     </BrowserRouter>
  );
};
export default App;
