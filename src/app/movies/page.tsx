"use client";
import useDebounce from "@/components/hooks/useDebounce";
import AddMovieModal from "@/components/movies/AddMovieModal";
import MovieTable from "@/components/movies/MovieTable";
import TextFieldInput from "@/components/TextFieldInput";
import useMovies from "@/hooks/useMovies";
import { useCallback, useState } from "react";

function Movie() {
  //state
  const [valueSearch, setValueSearch] = useState<string>("");
  // debounce
  const debouncedValue = useDebounce(valueSearch, 300);
  // hooks
  const { movies, dataSearchMovies } = useMovies({ title: debouncedValue ?? "" });
  // function
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  }, []);

  if (!movies) return <div>Loading...</div>;
  const dataMovies = dataSearchMovies ? dataSearchMovies : movies;
  console.log("Render Movie component");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput
            onChange={handleSearchChange}
            label="Tìm kiếm phim theo tên..."
            name="search"
            type="search"
            size="small"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">PHIM</h1>
        <div className="w-56 text-right">
          <AddMovieModal />
        </div>
      </div>
      <div className="mt-2">
        <MovieTable movies={dataMovies} />
      </div>
    </div>
  );
}

export default Movie;
