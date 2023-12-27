import { ReactNode,createContext, useContext, useState, useEffect } from 'react';
import {Cast,Episode,Film,Genre,Season,Actors,Trailer,MediaType,MovieContextType} from "../Interfaces";
import { formatResult } from "../utilies";
import { AxiosResponse } from "axios";
import { axiosClient } from "./Api";
 
interface MovieProviderProps {
  children: ReactNode;
}
const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }:MovieProviderProps) => {

  const [inTheaters, setInTheaters] = useState<Film[]>([]);
  const [trendings, setTrendings] = useState<Film[]>([]);
  const [populars, setpopulars] = useState<Film[]>([]);
  const [topRatedTv, settopRatedTv] = useState<Film[]>([]);
  const [topRatedMovie, settopRatedMovie] = useState<Film[]>([]);
  const [Actor, setActors] = useState<Actors[]> ([]);
 
  const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<any, AxiosResponse<{
      results: unknown[];
    }>
    >(`/trending/${mediaType}/day`);
    return data.results.slice(0,5).map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }
  return [];
  };

const getActors = async (): Promise<Actors[]> => {
  try {
    const { data } = await axiosClient.get<any, AxiosResponse<{
      results: Actors[]; // Adjust the response type as needed
    }>>(
      `/trending/person/day`
    );
    return (
      data.results.map((actor) => ({
        id: actor.id,
        name: actor.name,
        profile_path: actor.profile_path,
        popularity: actor.popularity,
      })) ?? []
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 const getInTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<any, AxiosResponse<{
        results: unknown[];
      }>
    >(`/movie/now_playing`);
    return data.results.map((val) => formatResult(val, "movie"));
  } catch (error) {
    console.error(error);
  }
  return [];
};

 const getPopulars = async (mediaType: MediaType,page = 1): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get< any,AxiosResponse<{
        results: unknown[];}>>(`/${mediaType}/popular`, {
      params: { page}});
    return data.results.map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }
  return [];
};

 const getTopRated = async (mediaType: MediaType,page = 1): Promise<{
   films: Film[];
   totalPages: number;}> => {
  try {
    const { data } = await axiosClient.get<any, AxiosResponse<{
        results: unknown[];
        total_pages: number;
      }>
    >(`/${mediaType}/top_rated`, {
      params: {page}});
    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error(error);
  }
  return {
    films: [],
    totalPages: 0,
  };
};
  
 const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get< any,AxiosResponse<{
        genres: unknown[];
    }>
    >(`/genre/${mediaType}/list`);
    return data.genres as Genre[];
  } catch (error) {
    console.error(error);
  }
  return [];
  };
  
  
 const search = async (query: string, page = 1): Promise<{
  totalPages: number;
  totalResults: number;
  films: Film[];
}> => {
  try {
    const { data } = await axiosClient.get<any,AxiosResponse<{
        total_pages: number;
        total_results: number;
        results: unknown[];
      }>
    >(`/search/multi`, {
      params: {query,page}});

    return {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      films: data.results.map((val) => formatResult(val)),
    };
  } catch (error) {
    console.error(error);
  }
  return {
    totalPages: 0,
    totalResults: 0,
    films: [],
  };
};

  const getDetail = async (mediaType: MediaType, id: number): Promise<
    null | Film> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}`);
    return formatResult(data, mediaType);
  } catch (error) {
    console.error(error);
  }
  return null;
};

 const getCasts = async ( mediaType: MediaType,id: number): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get< any, AxiosResponse<{
        cast: any[];
      }>
    >(`/${mediaType}/${id}/credits`);
    return (
      data.cast.map((cast) => ({
        id: cast.id,
        characterName: cast.character,
        name: cast.name,
        profilePath: cast.profile_path,
      })) ?? []
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

 const getTrailers = async (mediaType: MediaType,id: number): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get<any, AxiosResponse<{
        results: any[];
      }>
    >(`/${mediaType}/${id}/videos`);
    return (
      data.results
        .filter((res) => res.site.toLowerCase() === "youtube")
        .map((res) => ({
          id: res.id,
          key: res.key,
        })) ?? []
    );
  } catch (error) {
    console.error(error);
  }

  return [];
};

 
 const getRecommendations = async (
  mediaType: MediaType,
  id: number
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        results: unknown[];
      }>
    >(`/${mediaType}/${id}/similar`);
    return data.results.map((val) => formatResult(val, mediaType));
  } catch (error) {
    console.error(error);
  }
  return [];
};
  const getSeason = async (id: number, seasonNumber: number):
    Promise<Season | null> => {
  try {
    const { data } = await axiosClient.get<any, any>(
      `/tv/${id}/season/${seasonNumber}`
    );
    const film = await getDetail("tv", id);
    return {
      id: data.id,
      filmName: film?.title || "",
      name: data.name,
      posterPath: data.poster_path,
      seasonNumber: data.season_number,
      airDate: data.air_date,
      episodes: data.episodes.map(
        (episode: any) =>
          ({
            id: episode.id,
            title: episode.name,
            overview: episode.overview,
            airDate: episode.air_date,
            stillPath: episode.still_path,
            episodeNumber: episode.episode_number,
          } satisfies Episode)
      ),
    };
  } catch (error) {
    console.error(error);
  }

  return null;
};

 const discover = async (mediaType: MediaType,page = 1): Promise<{
  films: Film[];
  totalPages: number;
}> => {
  try {
    const { data } = await axiosClient.get<any,AxiosResponse<{
        total_pages: number;
        results: unknown[];
      }>
    >(`/discover/${mediaType}`, {
      params: { page }});
    return {
      films: data.results.map((val) => formatResult(val, mediaType)),
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error(error);
  }
  return {
    films: [],
    totalPages: 0,
  };
};

 useEffect(() => {
  const fetchData = async () => {
    try {
      const trendingData = await getTrendings("movie");
      setTrendings(trendingData);
      const fetchNonCriticalData = async () => {
        const [inTheatersData, popularsData, topRatedTvData, topRatedMovieData, actorsData] = await Promise.all([
          getInTheaters(),
          getPopulars("movie"),
          getTopRated("tv").then((data) => data.films),
          getTopRated("movie").then((data) => data.films),
          getActors()
        ]);
        setInTheaters(inTheatersData);
        setpopulars(popularsData);
        settopRatedTv(topRatedTvData);
        settopRatedMovie(topRatedMovieData);
        setActors(actorsData);
      };
      const timeoutId = setTimeout(fetchNonCriticalData, 1000);
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   };

     fetchData();
}, []);


  return (
    <MovieContext.Provider value={{
     trendings,
    inTheaters,
    Actor,
    populars,
    topRatedMovie,
    topRatedTv,
    getGenres,
    getDetail,
    search,
    discover,
    getSeason,
    getRecommendations,
    getTrailers,
    getCasts,
  }}>
      {children}
    </MovieContext.Provider>
  );
};
