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

export default function AddMovieModal() {
  const today = new Date().toISOString().split("T")[0];

  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // MUI selected
  const [status, setStatus] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  // hooks
  const { addMovie } = useMovies();
  const { showSnackbar } = useSnackbar();
  // state
  const [movie, setMovie] = React.useState<IMovie>({
    title: "",
    description: "",
    duration: 0,
    genre: "",
    releaseDate: dayjs().format("YYYY-MM-DD"),
    director: "",
    cast: "",
    poster: "",
    trailer: "",
    rating: 0,
    ageRate: 0,
    country: "",
    caption: "",
    status: "NOWSHOWING",
    numberMovieScreening: 0,
  });
  const [releaseDate, setReleaseDate] = React.useState<dayjs.Dayjs | null>(dayjs());
  // function
  const handleChangeValueMovie = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setReleaseDate(newDate);
    setMovie((prevMovie) => ({
      ...prevMovie,
      releaseDate: newDate ? newDate.format("YYYY-MM-DD") : today, // Nếu không chọn, dùng ngày hiện tại
    }));
  };
  const handleAddMovie = async () => {
    const movieData = await addMovie(movie);
    if (movieData.success) {
      showSnackbar("Thêm phim thành công", "success");
      handleClose();
    }
  };

  // Component
  const select = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Trạng thái</InputLabel>
          <Select onChange={handleChange} value={status} label="Trạng thái">
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
      <Button onClick={handleOpen} title="Thêm Phim" variant="contained" color="primary" />
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
            THÊM PHIM
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <TextFieldInput onChange={handleChangeValueMovie} name="title" label="Tên phim" />
                <TextFieldInput
                  onChange={handleChangeValueMovie}
                  name="description"
                  label="Mô tả phim"
                />
                <TextFieldInput
                  onChange={handleChangeValueMovie}
                  name="duration"
                  label="Thời gian phim ( Phút )"
                />
                <TextFieldInput onChange={handleChangeValueMovie} name="genre" label="Thể loại" />

                <DatePicker
                  sx={{ marginTop: "8px", width: "100%" }}
                  label="Ngày phát hành"
                  name="releaseDate"
                  value={releaseDate}
                  onChange={handleDateChange}
                />

                <TextFieldInput
                  onChange={handleChangeValueMovie}
                  name="director"
                  label="Đạo diễn"
                />
                <TextFieldInput onChange={handleChangeValueMovie} name="cast" label="Diễn viên" />
              </div>
              <div className="col-span-1">
                <TextFieldInput onChange={handleChangeValueMovie} name="poster" label="Ảnh" />
                <TextFieldInput onChange={handleChangeValueMovie} name="trailer" label="Trailer" />
                <TextFieldInput onChange={handleChangeValueMovie} name="ageRate" label="Độ tuổi" />
                <TextFieldInput onChange={handleChangeValueMovie} name="country" label="Quốc gia" />
                <TextFieldInput onChange={handleChangeValueMovie} name="caption" label="Phụ đề" />
                <TextFieldInput
                  onChange={handleChangeValueMovie}
                  name="numberMovieScreening"
                  label="Số ngày chiếu"
                  type="number"
                />
                <div className="mt-2">{select}</div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Button onClick={handleAddMovie} title="Thêm" variant="contained" color="primary" />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
