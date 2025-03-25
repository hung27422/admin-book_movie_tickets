import { IMovie } from "@/types/Movies";
import api from "@/utils/api";

const movieServices = {
  // Thêm phim
  addMovie: (movie: IMovie) => api.post("/movies", movie).then((res) => res.data),
  // Sửa phim
  updateMovie: (id: string, movie: IMovie) =>
    api.put(`/movies/${id}`, movie).then((res) => res.data),
  // Xóa phim
  deleteMovie: (id: string) => api.delete(`/movies/${id}`).then((res) => res.data),
};

export default movieServices;
