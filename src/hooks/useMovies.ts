import movieServices from "@/services/movieServices";
import { IMovie } from "@/types/Movies";
import useSWR from "swr";

function useMovies() {
  const { data: movies, error, mutate } = useSWR<IMovie[]>("/movies");

  const addMovie = async (movie: IMovie) => {
    try {
      const newMovie = await movieServices.addMovie(movie);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ newMovie });
      return newMovie;
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error);
      throw error;
    }
  };
  const updateMovie = async (id: string, movie: IMovie) => {
    try {
      const updatedMovie = await movieServices.updateMovie(id, movie);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ updatedMovie });
      return updatedMovie;
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
      throw error;
    }
  };
  const deleteMovie = async (id: string) => {
    try {
      await movieServices.deleteMovie(id);
      mutate(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      throw error;
    }
  };
  return { movies, error, addMovie, updateMovie, deleteMovie };
}

export default useMovies;
