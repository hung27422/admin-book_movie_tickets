import showtimeServices from "@/services/showtimeServices";
import { IShowTime } from "@/types/ShowTime";
import useSWR from "swr";
interface useShowTimeProps {
  idRoom?: string;
  idMovie?: string;
}
function useShowTime({ idRoom, idMovie }: useShowTimeProps = {}) {
  const { data: showtimes, error, mutate } = useSWR<IShowTime[]>("/showtimes");
  const { data: getShowTimeByRoomId } = useSWR<IShowTime[]>(`/showtimes/room/${idRoom}`);
  const { data: getShowTimeByRoomIdAndMovieID } = useSWR<IShowTime[]>(
    `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}`
  );

  const addShowTime = async (showtime: IShowTime) => {
    try {
      const newShowtime = await showtimeServices.addShowtime(showtime);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ newRoom: newShowtime });
      return newShowtime;
    } catch (error) {
      console.error("Lỗi khi thêm suất chiếu:", error);
      throw error;
    }
  };
  const updateShowTime = async (id: string, showtime: IShowTime) => {
    try {
      const updatedShowtime = await showtimeServices.updateShowtime(id, showtime);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ updatedRoom: updatedShowtime });
      return updatedShowtime;
    } catch (error) {
      console.error("Lỗi khi cập nhật suất chiếu:", error);
      throw error;
    }
  };
  const deleteShowtime = async (id: string) => {
    try {
      await showtimeServices.deleteShowtime(id);
      mutate(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa suất chiếu:", error);
      throw error;
    }
  };
  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    error,
    addShowTime,
    deleteShowtime,
    updateShowTime,
  };
}

export default useShowTime;
