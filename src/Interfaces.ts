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

export type Credentials = {
  email: string;
  password: string;
};

export type AuthGuardProps = {
  authenticatedComponent: React.ReactElement;
  unauthenticatedComponent: React.ReactElement;
};

export type AuthError = {
  code: string;
};

export interface StarRatingProps {
  rating: number; // Rating value (e.g., 3.5, 4.0)
  maxStars?: number; // Optional: Maximum number of stars (default is 5)
}
export type LayoutTypes = {
  name: [name: string, setName: React.Dispatch<React.SetStateAction<string>>];
};
export type Theme = "dark" | "light";
