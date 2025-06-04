import cinemasServices from "@/services/cinemasServices";
import { ICinemas, ICinemasByPageAndLimit } from "@/types/Cinemas";
import useSWR from "swr";

interface useCinemasProps {
  name?: string;
  page?: number;
  limit?: number;
}
function useCinemas({ name, page, limit }: useCinemasProps = {}) {
  const { data: cinemaAll, mutate } = useSWR<ICinemas[]>("cinemas/getAll");

  const { data: cinemas, error } = useSWR<ICinemasByPageAndLimit>(
    page && limit ? `/cinemas?page=${page}&limit=${limit}` : null
  );

  const { data: dataCinemaByName } = useSWR<ICinemas[]>(name && `/cinemas/search?name=${name}`);

  const addCinema = async (cinema: ICinemas) => {
    try {
      const newCinema = await cinemasServices.addCinema(cinema);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      return newCinema;
    } catch (error) {
      console.error("Lỗi khi thêm rạp:", error);
      throw error;
    }
  };

  const updateCinema = async (id: string, cinema: ICinemas) => {
    try {
      const updatedCinema = await cinemasServices.updateCinema(id, cinema);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      return updatedCinema;
    } catch (error) {
      console.error("Lỗi khi cập nhật rạp phim:", error);
      throw error;
    }
  };

  const deleteCinema = async (id: string) => {
    try {
      await cinemasServices.deleteCinema(id);
      mutate(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa rạp:", error);
      throw error;
    }
  };
  return { cinemas, cinemaAll, dataCinemaByName, error, addCinema, updateCinema, deleteCinema };
}

export default useCinemas;
