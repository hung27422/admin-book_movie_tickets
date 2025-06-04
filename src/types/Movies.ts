export interface IMovie {
  _id?: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  releaseDate: string;
  director: string;
  cast: string;
  poster: string;
  trailer: string;
  rating: number;
  ageRate: number;
  country: string;
  caption: string;
  status: string;
  numberMovieScreening: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    _id: string;
    username: string;
    fullName: string;
  };
  __v?: number;
}
export interface IMovieByPageAndLimit {
  data: IMovie[];
  currentPage: number;
  totalPages: number;
  totalMovies: number;
}
