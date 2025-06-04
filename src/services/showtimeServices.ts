import { IShowTime } from "@/types/ShowTime";
import api from "@/utils/api";

const showtimeServices = {
  // Thêm phim
  addShowtime: (showtime: IShowTime) => api.post("/showtimes", showtime).then((res) => res.data),
  // Sửa phim
  updateShowtime: (id: string, showtime: IShowTime) =>
    api.put(`/showtimes/${id}`, showtime).then((res) => res.data),
  //
  updateShowTimeEveryday: (ids: string[], startTime: string) =>
    api.put("/showtimes/update-same-time", { ids, startTime }).then((res) => res.data),
  // Xóa phim
  deleteShowtime: (id: string) => api.delete(`/showtimes/${id}`).then((res) => res.data),
};

export default showtimeServices;
