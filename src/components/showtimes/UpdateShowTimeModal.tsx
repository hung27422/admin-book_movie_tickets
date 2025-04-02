/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import { Autocomplete, TextField } from "@mui/material";

import useSnackbar from "../hooks/useSnackbar";
import useCinemas from "@/hooks/useCinemas";
import { ICinemas } from "@/types/Cinemas";
import { IShowTime } from "@/types/ShowTime";
import useShowTime from "@/hooks/useShowTimes";
import useRooms from "@/hooks/useRooms";
import { IRoom } from "@/types/Rooms";
import useMovies from "@/hooks/useMovies";
import { IMovie } from "@/types/Movies";
import { DateTimePicker } from "@mui/x-date-pickers";
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

interface UpdateShowTimeModalProps {
  showtime: IShowTime;
}

export default function UpdateShowTimeModal({ showtime: showTimeData }: UpdateShowTimeModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // state
  const [showtime, setShowTime] = React.useState<IShowTime>(showTimeData);
  // hook
  const { updateShowTime } = useShowTime();
  const { getRoomsByCinemaId, rooms } = useRooms({ idCinema: showtime.cinemaId });
  const { cinemas } = useCinemas();
  const { movies } = useMovies();
  const { showSnackbar } = useSnackbar();
  // const
  const defaultCinema = cinemas?.find((cinema) => cinema._id === showTimeData.cinema?._id);
  const defaultRoom = rooms?.find((room) => room._id === showTimeData?.room?._id);
  const defaultMovie = movies?.find((movie) => movie._id === showTimeData.movie?._id);
  // Set giá trị mặc định khi modal mở
  React.useEffect(() => {
    setShowTime({
      ...showtime,
      cinemaId: defaultCinema?._id ?? showtime.cinemaId,
      roomId: defaultRoom?._id ?? showtime.roomId,
      movieId: defaultMovie?._id ?? showtime.movieId,
    });
  }, [defaultCinema, defaultRoom, defaultMovie]);
  // funtion
  const handleSelectCinema = (event: React.SyntheticEvent, value: ICinemas | null) => {
    const selectedId = value?._id ?? "";
    setShowTime((prev) => ({ ...prev, cinemaId: selectedId }));
  };

  const handleSelectRoom = (event: React.SyntheticEvent, value: IRoom | null) => {
    const selectedId = value?._id ?? "";
    setShowTime((prev) => ({ ...prev, roomId: selectedId }));
  };

  const handleSelectMovie = (event: React.SyntheticEvent, value: IMovie | null) => {
    const selectedId = value?._id ?? "";
    setShowTime((prev) => ({ ...prev, movieId: selectedId }));
  };

  const handleChangeValueShowTime = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShowTime((prev) => ({
      ...prev,
      [name]: name === "doubleSeatRow" ? value.split(",").map((num) => Number(num.trim())) : value,
    }));
  };

  const handleUpdateShowTime = async () => {
    // Kiểm tra chỉ những trường đã thay đổi
    const updatedShowTime = { ...showtime };
    // Nếu không thay đổi cinema, room, hoặc movie, giữ nguyên các giá trị mặc định
    if (showtime.cinemaId === showTimeData.cinemaId) {
      updatedShowTime.cinemaId = showTimeData.cinemaId; // Giữ giá trị cũ
    }
    if (showtime.roomId === showTimeData.roomId) {
      updatedShowTime.roomId = showTimeData.roomId; // Giữ giá trị cũ
    }
    if (showtime.movieId === showTimeData.movieId) {
      updatedShowTime.movieId = showTimeData.movieId; // Giữ giá trị cũ
    }
    // Tiến hành gọi API với chỉ các trường cần cập nhật
    const response = await updateShowTime(showTimeData._id ?? "", updatedShowTime);
    if (response.success) {
      showSnackbar("Cập nhật suất chiếu thành công", "success");
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} title="Sửa" variant="contained" color="primary" />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ letterSpacing: 2, fontWeight: "bold", fontSize: "30px", textAlign: "center" }}
          >
            CẬP NHẬT SUẤT CHIẾU
          </Typography>
          <Box sx={{ mt: 2 }}>
            <div className="mt-2">
              <Autocomplete
                id="cinema-select"
                sx={{ width: "100%" }}
                options={cinemas ?? []}
                value={defaultCinema || null}
                getOptionLabel={(cinema) => cinema.name}
                onChange={handleSelectCinema}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn rạp để thêm suất chiếu" />
                )}
              />
            </div>
            <div className="mt-2">
              <Autocomplete
                id="room-select"
                sx={{ width: "100%" }}
                options={getRoomsByCinemaId ?? []}
                value={defaultRoom || null}
                getOptionLabel={(room) => room.name}
                onChange={handleSelectRoom}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn phòng để thêm suất chiếu" />
                )}
              />
            </div>
            <div className="mt-2">
              <Autocomplete
                id="movie-select"
                sx={{ width: "100%" }}
                options={movies ?? []}
                value={defaultMovie || null}
                getOptionLabel={(movie) => movie.title}
                onChange={handleSelectMovie}
                renderInput={(params) => (
                  <TextField {...params} label="Chọn phim để thêm suất chiếu" />
                )}
              />
            </div>

            <div className="mt-2">
              <DateTimePicker
                value={showtime.startTime ? dayjs(showtime.startTime) : null}
                onChange={(newValue) =>
                  setShowTime((prev) => ({
                    ...prev,
                    startTime: newValue ? newValue.toISOString() : "",
                  }))
                }
                ampm={false}
                sx={{ width: "100%" }}
              />
            </div>
            <div className="mt-2">
              <DateTimePicker
                value={showtime.endTime ? dayjs(showtime.endTime) : null}
                onChange={(newValue) =>
                  setShowTime((prev) => ({
                    ...prev,
                    endTime: newValue ? newValue.toISOString() : "",
                  }))
                }
                ampm={false}
                sx={{ width: "100%" }}
              />
            </div>
            <div className="mt-2">
              <TextFieldInput
                onChange={handleChangeValueShowTime}
                name="price"
                label="Nhập giá vé"
                value={showtime.price}
              />
            </div>
            <div className="mt-2">
              <TextFieldInput
                onChange={handleChangeValueShowTime}
                name="availableSeats"
                label="Nhập số ghế"
                value={showtime.availableSeats}
              />
            </div>

            <div className="flex items-center justify-center mt-4 gap-2">
              <Button
                onClick={handleUpdateShowTime}
                title="Cập nhật"
                variant="contained"
                color="primary"
              />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
