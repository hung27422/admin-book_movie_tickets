export interface IStatistic {
  success: boolean;
  data: {
    from: string;
    to: string;
    totalRevenue: number;
    totalTicketsSold: number;
    emptySeats: number;
    totalShowtimes: number;
  };
}

export interface IHotMovie {
  success: boolean;
  from: string;
  to: string;
  hotMovies: HotMovies[];
}

interface HotMovies {
  movie: {
    _id: string;
    title: string;
    description: string;
    duration: number;
    genre: string[];
    releaseDate: string;
    director: string;
    cast: string[];
    poster: string;
    trailer: string;
    rating: number;
    ageRate: number;
    country: string;
    caption: string;
    status: string;
    user: string;
  };
  totalSeats: number;
}

export interface CinemaStatistic {
  cinemaName: string;
  totalRevenue: number;
  totalSeats: number;
  totalBookings: number;
}
export interface IRevenueStatisticResponse {
  success: boolean;
  from: string;
  to: string;
  totalRevenue: number;
  totalSeats: number;
  totalBookings: number;
  cinemas: CinemaStatistic[];
}
