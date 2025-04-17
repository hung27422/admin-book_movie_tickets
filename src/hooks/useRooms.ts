import roomsServices from "@/services/roomsServices";
import { IRoom } from "@/types/Rooms";
import useSWR from "swr";

interface useRoomsProps {
  idCinema?: string;
}
function useRooms({ idCinema }: useRoomsProps = {}) {
  const { data: rooms, error, mutate } = useSWR<IRoom[]>("/rooms");
  const { data: getRoomsByCinemaId } = useSWR<IRoom[]>(
    idCinema ? `/rooms?cinemaId=${idCinema}` : null
  );

  const addRoom = async (room: IRoom) => {
    try {
      const newRoom = await roomsServices.addRoom(room);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ newRoom });
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
      console.log({ updatedRoom });
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
  return { rooms, getRoomsByCinemaId, error, addRoom, deleteRoom, updateRoom };
}

export default useRooms;
