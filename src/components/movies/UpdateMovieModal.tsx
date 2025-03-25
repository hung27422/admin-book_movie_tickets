import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { IMovie } from "@/types/Movies";
import useMovies from "@/hooks/useMovies";
import useSnackbar from "../hooks/useSnackbar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UpdateMovieModalProps {
  movie: IMovie;
}
export default function UpdateMovieModal({ movie: movieData }: UpdateMovieModalProps) {
  // const today = new Date().toISOString().split("T")[0];
  const id = movieData._id;
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // hooks
  const { updateMovie } = useMovies();
  const { showSnackbar } = useSnackbar();
  // state
  const [movie, setMovie] = React.useState<IMovie>({
    title: movieData.title,
    description: movieData.description,
    duration: movieData.duration,
    genre: movieData.genre,
    releaseDate: movieData.releaseDate,
    director: movieData.director,
    cast: movieData.cast,
    poster: movieData.poster,
    trailer: movieData.trailer,
    rating: movieData.rating,
    ageRate: movieData.ageRate,
    country: movieData.country,
    caption: movieData.caption,
    status: movieData.status,
  });
  const [releaseDate, setReleaseDate] = React.useState<dayjs.Dayjs | null>(
    movieData.releaseDate ? dayjs(movieData.releaseDate) : null
  );
  // function
  const handleChangeValueMovie = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setReleaseDate(newDate);
    if (newDate) {
      setMovie((prevMovie) => ({
        ...prevMovie,
        releaseDate: newDate.format("YYYY-MM-DD"),
      }));
    }
  };
  const handleUpdateMovie = async () => {
    const updatedMovieData = await updateMovie(id ?? "", movie);
    if (updatedMovieData.success) {
      showSnackbar("Cập nhật phim thành công", "success");
      handleClose();
    }
  };
  const handleChangeStatus = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setMovie((prevMovie) => ({
      ...prevMovie,
      status: value,
    }));
  };

  // Component
  const select = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            onChange={handleChangeStatus}
            value={movie.status || "NOWSHOWING"}
            label="Trạng thái"
          >
            <MenuItem value="NOWSHOWING">Đang chiếu</MenuItem>
            <MenuItem value="COMINGSOON">Sắp chiếu</MenuItem>
            <MenuItem value="TEMPORARILYCLOSED">Tạm ngưng</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
  return (
    <div>
      <Button onClick={handleOpen} title="Sửa" variant="contained" color="success" />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ letterSpacing: 2, fontWeight: "bold", fontSize: "30px", textAlign: "center" }}
          >
            CẬP NHẬT PHIM
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <TextFieldInput
                  value={movie.title}
                  onChange={handleChangeValueMovie}
                  name="title"
                  label="Tên phim"
                />
                <TextFieldInput
                  value={movie.description}
                  onChange={handleChangeValueMovie}
                  name="description"
                  label="Mô tả phim"
                />
                <TextFieldInput
                  value={movie.duration}
                  onChange={handleChangeValueMovie}
                  name="duration"
                  label="Thời gian phim ( Phút )"
                />
                <TextFieldInput
                  value={movie.genre}
                  onChange={handleChangeValueMovie}
                  name="genre"
                  label="Thể loại"
                />

                <DatePicker
                  sx={{ marginTop: "8px", width: "100%" }}
                  label="Ngày phát hành"
                  name="releaseDate"
                  defaultValue={releaseDate}
                  value={releaseDate}
                  onChange={handleDateChange}
                />

                <TextFieldInput
                  value={movie.director}
                  onChange={handleChangeValueMovie}
                  name="director"
                  label="Đạo diễn"
                />
                <TextFieldInput
                  value={movie.cast}
                  onChange={handleChangeValueMovie}
                  name="cast"
                  label="Diễn viên"
                />
              </div>
              <div className="col-span-1">
                <TextFieldInput
                  value={movie.poster}
                  onChange={handleChangeValueMovie}
                  name="poster"
                  label="Ảnh"
                />
                <TextFieldInput
                  value={movie.trailer}
                  onChange={handleChangeValueMovie}
                  name="trailer"
                  label="Trailer"
                />
                <TextFieldInput
                  value={movie.ageRate}
                  onChange={handleChangeValueMovie}
                  name="ageRate"
                  label="Độ tuổi"
                />
                <TextFieldInput
                  value={movie.country}
                  onChange={handleChangeValueMovie}
                  name="country"
                  label="Quốc gia"
                />
                <TextFieldInput
                  value={movie.caption}
                  onChange={handleChangeValueMovie}
                  name="caption"
                  label="Phụ đề"
                />
                <div className="mt-2">{select}</div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Button onClick={handleUpdateMovie} title="Sửa" variant="contained" color="primary" />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
