import { IRoom } from "@/types/Rooms";
import api from "@/utils/api";

const roomsServices = {
  // Thêm phim
  addRoom: (room: IRoom) => api.post("/rooms", room).then((res) => res.data),
  // Sửa phim
  updateRoom: (id: string, room: IRoom) => api.put(`/rooms/${id}`, room).then((res) => res.data),
  // Xóa phim
  deleteRoom: (id: string) => api.delete(`/rooms/${id}`).then((res) => res.data),
};

export default roomsServices;
