import { IMovie } from "@/types/Movies";
import api from "@/utils/api";

const movieServices = {
  // Thêm phim
  addMovie: (movie: IMovie) => api.post("/movies", movie).then((res) => res.data),
};

export default movieServices;
