interface IMovie {
  _id: string;
  title: string;
}

interface IRoom {
  _id: string;
  name: string;
}
interface ICinemas {
  _id: string;
  name: string;
}
interface ISeatPricing {
  SINGLE: number;
  DOUBLE: number;
}
export interface IShowTime {
  _id?: string;
  movieId: string;
  cinemaId: string;
  roomId: string;
  movie?: IMovie;
  room?: IRoom;
  cinema?: ICinemas;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
  seatPricing: ISeatPricing;
  createdAt?: string;
  updatedAt?: string;
}
