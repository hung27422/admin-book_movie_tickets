import { ICinemas } from "@/types/Cinemas";
import api from "@/utils/api";

const cinemasServices = {
  // Thêm phim
  addCinema: (cinema: ICinemas) => api.post("/cinemas", cinema).then((res) => res.data),
  // Sửa phim
  updateCinema: (id: string, cinema: ICinemas) =>
    api.put(`/cinemas/${id}`, cinema).then((res) => res.data),
  // Xóa phim
  deleteCinema: (id: string) => api.delete(`/cinemas/${id}`).then((res) => res.data),
};

export default cinemasServices;
