"use client";
import AddMovieModal from "@/components/movies/AddMovieModal";
import MovieTable from "@/components/movies/MovieTable";
import TextFieldInput from "@/components/TextFieldInput";
import useMovies from "@/hooks/useMovies";

function Movie() {
  const { movies } = useMovies();
  if (!movies) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput label="Tìm kiếm phim..." name="search" type="search" size="small" />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">PHIM</h1>
        <div className="w-56 text-right">
          <AddMovieModal />
        </div>
      </div>
      <div className="mt-2">
        <MovieTable movies={movies} />
      </div>
    </div>
  );
}

export default Movie;
