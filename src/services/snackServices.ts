import { ISnack } from "@/types/Snack";
import api from "@/utils/api";

const snacksServices = {
  // Thêm bắp nước (có idCinema)
  addSnack: (snack: ISnack) => api.post(`/snacks`, snack).then((res) => res.data),
  // Sửa bắp nước
  updateSnack: (id: string, snack: ISnack) =>
    api.put(`/snacks/${id}`, snack).then((res) => res.data),
  // Xóa bắp nước
  deleteSnack: (id: string) => api.delete(`/snacks/${id}`).then((res) => res.data),
};

export default snacksServices;
