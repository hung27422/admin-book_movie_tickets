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
  return { movies, error, addMovie };
}

export default useMovies;
