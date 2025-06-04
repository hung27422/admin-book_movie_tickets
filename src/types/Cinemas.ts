export interface ICinemas {
  _id?: string;
  name: string;
  image: string;
  location: string;
  cinemaCode: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICinemasByPageAndLimit {
  data: ICinemas[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
