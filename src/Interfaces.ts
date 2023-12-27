import { ReactNode } from "react";
export type MediaType = "movie" | "tv";

export interface customProps {
  children?: ReactNode;
  className?: string;
}
export interface Episode {
  id: number;
  title: string;
  overview: string;
  airDate: string;
  stillPath: string;
  episodeNumber: number;
}
export interface Season {
  id: number;
  filmName: string;
  name: string;
  seasonNumber: number;
  posterPath: string;
  episodes: Episode[];
  airDate: string;
}
export type DetailPage = {
  detailPage: (film: Film) => void;
};
export interface Film {
  id: number;
  title: string;
  tagline: string;
  mediaType: MediaType;
  description: string;
  overview: string;
  releaseDate: string;
  runtime: number;
  status: string;
  voteAverage: number;
  coverPath: string;
  posterPath: string;
  seasons: Season[];
  generIds: number[];
}
export interface Cast {
  id: number;
  name: string;
  characterName: string;
  profilePath: string;
}

export interface Trailer {
  id: number;
  key: string;
}

export interface Genre {
  id: number;
  name: string;
}

export type AuthGuardProps = {
  authenticatedComponent: React.ReactElement;
  unauthenticatedComponent: React.ReactElement;
};

export type AuthError = {
  code: string;
};
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}
export interface AuthContextType {
  user: User | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export interface MovieContextType {
  trendings: Film[];
  inTheaters: Film[];
  populars: Film[];
  topRatedMovie: Film[];
  topRatedTv: Film[];
  Actor:Actors[];
  getGenres: (mediaType: MediaType) => Promise<Genre[]>;
  search: (query: string, page?: number) => Promise<{
    totalPages: number;
    totalResults: number;
    films: Film[];
  }>;
  discover: (mediaType: MediaType, page?: number) => Promise<{
    films: Film[];
    totalPages: number;
  }>;
  getSeason: (id: number, seasonNumber: number) => Promise<Season | null>;
  getRecommendations: (mediaType: MediaType, id: number) => Promise<Film[]>;
  getTrailers: (mediaType: MediaType, id: number) => Promise<Trailer[]>;
  getCasts: (mediaType: MediaType, id: number) => Promise<Cast[]>;
  getDetail: (mediaType: MediaType, id: number) => Promise<null | Film>;
}
export interface Actors{
  id: number;
  name: string;
  profile_path: string;
  popularity: number;
}
export interface TrendHeroProps {
  film: Film;
  onClick: () => void;
  onPlayTrailer: () => void;
  voteAverage: number; 
  maxStars: number; }
export type LayoutTypes = {
  name: [name: string, setName: React.Dispatch<React.SetStateAction<string>>];
};
export type Theme = "dark" | "light";
export interface Toggle{
   toggleTheme: () => void
   handleClose: () => void;
}