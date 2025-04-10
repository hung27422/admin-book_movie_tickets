import cinemasServices from "@/services/cinemasServices";
import { ICinemas } from "@/types/Cinemas";
import useSWR from "swr";

interface useCinemasProps {
  name?: string;
}
function useCinemas({ name }: useCinemasProps = {}) {
  const { data: cinemas, error, mutate } = useSWR<ICinemas[]>("/cinemas");
  const { data: dataCinemaByName } = useSWR<ICinemas[]>(`/cinemas/search?name=${name}`);

  const addCinema = async (cinema: ICinemas) => {
    try {
      const newCinema = await cinemasServices.addCinema(cinema);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ newCinema });
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
      console.log({ updatedCinema });
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
  return { cinemas, dataCinemaByName, error, addCinema, updateCinema, deleteCinema };
}

export default useCinemas;
