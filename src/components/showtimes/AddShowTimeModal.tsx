import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import { Autocomplete, TextField } from "@mui/material";

import useSnackbar from "../hooks/useSnackbar";
import useCinemas from "@/hooks/useCinemas";
import Image from "next/image";
import { ICinemas } from "@/types/Cinemas";
import { IShowTime } from "@/types/ShowTime";
import useShowTime from "@/hooks/useShowTimes";
import useRooms from "@/hooks/useRooms";
import { IRoom } from "@/types/Rooms";
import useMovies from "@/hooks/useMovies";
import { IMovie } from "@/types/Movies";
import { DateTimePicker } from "@mui/x-date-pickers";
import useAddress from "@/utils/hooks/useAddress";

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

interface IAddress {
  id: number;
  name: string;
}
export default function AddShowTimeModal() {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // state
  const [selectValueNameAddress, setSelectValueNameAddress] = React.useState<IAddress>();
  console.log({ selectValueNameAddress });

  const [showtime, setShowTime] = React.useState<IShowTime>({
    movieId: "",
    roomId: "",
    cinemaId: "",
    startTime: "",
    price: 0,

    seatPricing: { DOUBLE: 0, SINGLE: 1 },
  });
  // MUI selected
  const handleSelectIdCinema = (event: React.SyntheticEvent, value: ICinemas | null) => {
    const selectedId = value?._id || "";
    setShowTime((prevShowTime) => ({
      ...prevShowTime,
      cinemaId: selectedId,
    }));
  };
  const handleSelectIdRoom = (event: React.SyntheticEvent, value: IRoom | null) => {
    const selectedId = value?._id || "";
    setShowTime((prevShowTime) => ({
      ...prevShowTime,
      roomId: selectedId,
    }));
  };
  const handleSelectIdMovie = (event: React.SyntheticEvent, value: IMovie | null) => {
    const selectedId = value?._id || "";
    setShowTime((prevShowTime) => ({
      ...prevShowTime,
      movieId: selectedId,
    }));
  };
  // hooks
  const { address } = useAddress();
  const { addShowTime } = useShowTime();
  const { getRoomsByCinemaId } = useRooms({ idCinema: showtime.cinemaId });
  const { dataCinemasByLocation } = useCinemas({
    location: selectValueNameAddress?.name,
  });
  const { movieAll } = useMovies();
  const { showSnackbar } = useSnackbar();

  // function
  const handleChangeValueShowTime = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShowTime((prevRoom) => ({
      ...prevRoom,
      [name]:
        name === "doubleSeatRow"
          ? value.split(",").map((num) => Number(num.trim())) // Chuyển thành mảng số
          : value,
    }));
  };

  const handleAddShowTime = async () => {
    const showTimeData = await addShowTime(showtime);
    if (showTimeData.success) {
      showSnackbar("Thêm suất chiếu thành công", "success");
      handleClose();
    }
  };

  // Component
  const selectNameAddress = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={address ?? []}
          autoHighlight
          getOptionLabel={(item) => item.name}
          onChange={(_, value) => setSelectValueNameAddress(value ?? undefined)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > Image": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn địa chỉ thêm rạp"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      </Box>
    </div>
  );
  const selectIdCinemas = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={dataCinemasByLocation ?? []}
          autoHighlight
          getOptionLabel={(cinema) => cinema.name}
          onChange={(event, value) => handleSelectIdCinema(event, value)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > Image": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <Image
                  loading="lazy"
                  width={30}
                  height={30}
                  src={option.image}
                  alt=""
                  style={{ objectFit: "cover" }}
                  className="mr-3 rounded-lg"
                />
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn rạp để thêm suất chiếu"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      </Box>
    </div>
  );
  const selectIdRoom = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={getRoomsByCinemaId ?? []}
          autoHighlight
          getOptionLabel={(cinema) => cinema.name}
          onChange={(event, value) => handleSelectIdRoom(event, value)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > Image": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn phòng để thêm suất chiếu"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      </Box>
    </div>
  );
  const selectIdMovie = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={movieAll ?? []}
          autoHighlight
          getOptionLabel={(cinema) => cinema.title}
          onChange={(event, value) => handleSelectIdMovie(event, value)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ "& > Image": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <Image
                  loading="lazy"
                  width={30}
                  height={30}
                  src={option?.poster}
                  alt=""
                  style={{ objectFit: "cover" }}
                  className="mr-3 rounded-lg"
                />
                {option?.title}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chọn phim để thêm suất chiếu"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
        />
      </Box>
    </div>
  );
  return (
    <div>
      <Button onClick={handleOpen} title="Thêm Suất Chiếu" variant="contained" color="primary" />
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
            THÊM SUẤT CHIẾU
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="mt-2">{selectNameAddress}</div>
            <div className="mt-2">{selectIdCinemas}</div>
            <div className="mt-2">{selectIdRoom}</div>
            <div className="mt-2">{selectIdMovie}</div>

            <div className="">
              <TextFieldInput
                onChange={handleChangeValueShowTime}
                name="price"
                label="Nhập giá vé"
              />
              <div className="flex items-center gap-2">
                <TextFieldInput
                  onChange={(e) =>
                    setShowTime((prevShowTime) => ({
                      ...prevShowTime,
                      seatPricing: {
                        ...prevShowTime.seatPricing,
                        SINGLE: Number(e.target.value),
                      },
                    }))
                  }
                  value={1}
                  name="SINGLE"
                  label="% Giá ghế đơn"
                />
                <TextFieldInput
                  onChange={(e) =>
                    setShowTime((prevShowTime) => ({
                      ...prevShowTime,
                      seatPricing: {
                        ...prevShowTime.seatPricing,
                        DOUBLE: Number(e.target.value),
                      },
                    }))
                  }
                  name="DOUBLE"
                  label="% Giá ghế đôi"
                />
              </div>
              <div className="flex items-center gap-2">
                <DateTimePicker
                  label="Select Date"
                  name="startTime"
                  onChange={(newValue) => {
                    setShowTime((prevShowTime) => ({
                      ...prevShowTime,
                      startTime: newValue ? newValue.toISOString() : "",
                    }));
                  }}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { label: "Giờ bắt đầu" } }}
                  ampm={false}
                  sx={{ width: "100%", marginTop: "8px" }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Button
                onClick={handleAddShowTime}
                title="Thêm"
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
