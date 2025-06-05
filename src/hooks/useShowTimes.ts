import showtimeServices from "@/services/showtimeServices";
import { IShowTime, IShowTimeByPageAndLimit } from "@/types/ShowTime";
import useSWR from "swr";
interface useShowTimeProps {
  idRoom?: string;
  idMovie?: string;
  page?: number;
  limit?: number;
}
function useShowTime({ idRoom, idMovie, page, limit }: useShowTimeProps = {}) {
  const showtimeKey = page && limit ? `/showtimes?page=${page}&limit=${limit}` : null;
  const roomKey = idRoom ? `/showtimes/room/${idRoom}` : null;
  const filterKey =
    idRoom && idMovie ? `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}` : null;

  const { data: showtimes, error, mutate } = useSWR<IShowTimeByPageAndLimit>(showtimeKey);
  const { data: getShowTimeByRoomId, mutate: mutateByRoom } = useSWR<IShowTime[]>(roomKey);
  const { data: getShowTimeByRoomIdAndMovieID, mutate: mutateByRoomIdAndMovie } =
    useSWR<IShowTime[]>(filterKey);

  const addShowTime = async (showtime: IShowTime) => {
    try {
      const newShowtime = await showtimeServices.addShowtime(showtime);
      mutate();
      mutateByRoom();
      mutateByRoomIdAndMovie();
      return newShowtime;
    } catch (error) {
      console.error("Lỗi khi thêm suất chiếu:", error);
      throw error;
    }
  };
  const updateShowTime = async (id: string, showtime: IShowTime) => {
    try {
      const updatedShowtime = await showtimeServices.updateShowtime(id, showtime);
      mutate();
      mutateByRoom();
      mutateByRoomIdAndMovie();
      return updatedShowtime;
    } catch (error) {
      console.error("Lỗi khi cập nhật suất chiếu:", error);
      throw error;
    }
  };
  const updateShowTimeEveryday = async (ids: string[], startTime: string) => {
    try {
      const updateShowTimeEveryday = await showtimeServices.updateShowTimeEveryday(ids, startTime);
      mutate();
      mutateByRoom();
      mutateByRoomIdAndMovie();
      return updateShowTimeEveryday;
    } catch (error) {
      console.error("Lỗi khi cập nhật suất chiếu mỗi ngày:", error);
      throw error;
    }
  };
  const deleteShowtime = async (id: string) => {
    try {
      await showtimeServices.deleteShowtime(id);
      mutate();
      mutateByRoom();
      mutateByRoomIdAndMovie();
    } catch (error) {
      console.error("Lỗi khi xóa suất chiếu:", error);
      throw error;
    }
  };
  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    updateShowTimeEveryday,
    error,
    addShowTime,
    deleteShowtime,
    updateShowTime,
  };
}

export default useShowTime;
