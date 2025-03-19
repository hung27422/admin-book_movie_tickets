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
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
