import { IMovie } from "@/types/Movies";
import MovieInfoModal from "./MovieInfoModal";
import UpdateMovieModal from "./UpdateMovieModal";
import DeleteMovieModal from "./DeleteMovieModal";

interface MovieActionButtonProp {
  movie: IMovie;
}
function MovieActionButton({ movie }: MovieActionButtonProp) {
  return (
    <div className="flex items-center justify-center gap-2">
      <MovieInfoModal movie={movie} />
      <UpdateMovieModal movie={movie} />
      <DeleteMovieModal movie={movie} />
    </div>
  );
}

export default MovieActionButton;
