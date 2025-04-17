import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import { Autocomplete, TextField } from "@mui/material";

import useSnackbar from "../hooks/useSnackbar";
import { IRoom } from "@/types/Rooms";
import useRooms from "@/hooks/useRooms";
import useCinemas from "@/hooks/useCinemas";
import Image from "next/image";
import { ICinemas } from "@/types/Cinemas";

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

export default function AddRoomModal() {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // MUI selected
  const handleSelectIdCinema = (event: React.SyntheticEvent, value: ICinemas | null) => {
    const selectedId = value?._id || "";
    setRoom((prevRoom) => ({
      ...prevRoom,
      cinemaId: { ...prevRoom.cinemaId, _id: selectedId },
    }));
  };

  // hooks
  const { addRoom } = useRooms();
  const { cinemas } = useCinemas();
  const { showSnackbar } = useSnackbar();
  // state
  const [room, setRoom] = React.useState<IRoom>({
    name: "",
    cinemaId: {name: "", _id: ""},
    rows: 0,
    cols: 0,
    aisleCols: [],
    doubleSeatRow: [],
    type: "DEFAULT",
  });

  // function
  const handleChangeValueRoom = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]:
        name === "doubleSeatRow"
          ? value.split(",").map((num) => Number(num.trim())) // Chuyển thành mảng số
          : value,
    }));
  };

  const handleAddRoom = async () => {
    const movieData = await addRoom(room);
    if (movieData.success) {
      showSnackbar("Thêm phòng thành công", "success");
      handleClose();
    }
  };

  // Component
  const select = (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={cinemas ?? []}
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
              label="Chọn rạp để thêm phòng"
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
      <Button onClick={handleOpen} title="Thêm Phòng" variant="contained" color="primary" />
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
            THÊM PHÒNG
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="mt-2">{select}</div>

            <div className="col-span-1">
              <TextFieldInput onChange={handleChangeValueRoom} name="name" label="Tên Phòng" />
              <TextFieldInput
                onChange={handleChangeValueRoom}
                name="rows"
                label="Nhập số hàng ghế"
              />
              <TextFieldInput
                onChange={handleChangeValueRoom}
                name="cols"
                label="Nhập số cột ghế"
              />
              <TextFieldInput
                onChange={handleChangeValueRoom}
                name="aisleCols"
                label="Nhập cột cần khoảng trống"
              />
              <TextFieldInput
                onChange={handleChangeValueRoom}
                name="doubleSeatRow"
                label="Nhập hàng làm ghế đôi"
              />
            </div>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Button onClick={handleAddRoom} title="Thêm" variant="contained" color="primary" />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
