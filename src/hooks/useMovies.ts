import movieServices from "@/services/movieServices";
import { IMovie, IMovieByPageAndLimit } from "@/types/Movies";
import useSWR from "swr";
interface useMoviesProps {
  title?: string;
  page?: number;
  limit?: number;
}
function useMovies({ title, page, limit }: useMoviesProps = {}) {
  const {
    data: movieAll,
    mutate,
    isLoading: isLoadingGetAllMovie,
  } = useSWR<IMovie[]>("/movies/getAll");
  const { data: movies, error } = useSWR<IMovieByPageAndLimit>(
    page && limit ? `/movies?page=${page}&limit=${limit}` : null
  );

  const { data: dataSearchMovies } = useSWR<IMovie[]>(title && `/movies/search?title=${title}`);

  const addMovie = async (movie: IMovie) => {
    try {
      const newMovie = await movieServices.addMovie(movie);
      mutate(); // Cập nhật dữ liệu ngay lập tức
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

  return {
    movies,
    movieAll,
    dataSearchMovies,
    isLoadingGetAllMovie,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
  };
}

export default useMovies;
