import roomsServices from "@/services/roomsServices";
import { IRoom, IRoomByPageAndLimit } from "@/types/Rooms";
import useSWR from "swr";

interface useRoomsProps {
  idCinema?: string;
  page?: number;
  limit?: number;
}
function useRooms({ idCinema, page, limit }: useRoomsProps = {}) {
  const { data: roomAll, mutate, error } = useSWR<IRoom[]>("/rooms/getAll");

  const { data: rooms } = useSWR<IRoomByPageAndLimit>(
    page && limit ? `/rooms?page=${page}&limit=${limit}` : null
  );

  const { data: getRoomsByCinemaId } = useSWR<IRoom[]>(
    idCinema ? `/rooms/by-cinema?cinemaId=${idCinema}` : null
  );

  const addRoom = async (room: IRoom) => {
    try {
      const newRoom = await roomsServices.addRoom(room);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      return newRoom;
    } catch (error) {
      console.error("Lỗi khi thêm phòng:", error);
      throw error;
    }
  };
  const updateRoom = async (id: string, room: IRoom) => {
    try {
      const updatedRoom = await roomsServices.updateRoom(id, room);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      return updatedRoom;
    } catch (error) {
      console.error("Lỗi khi cập nhật room:", error);
      throw error;
    }
  };
  const deleteRoom = async (id: string) => {
    try {
      await roomsServices.deleteRoom(id);
      mutate(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa room:", error);
      throw error;
    }
  };
  return { rooms, roomAll, getRoomsByCinemaId, error, addRoom, deleteRoom, updateRoom };
}

export default useRooms;
