import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import useSnackbar from "../hooks/useSnackbar";
import { IRoom } from "@/types/Rooms";
import useRooms from "@/hooks/useRooms";

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

interface UpdateRoomModalProps {
  room: IRoom;
}
export default function UpdateRoomModal({ room: roomData }: UpdateRoomModalProps) {
  console.log({ roomData });
  const id = roomData._id;

  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // hooks
  const { updateRoom } = useRooms();
  const { showSnackbar } = useSnackbar();

  // state
  const [room, setRoom] = React.useState<IRoom>({
    name: roomData.name,
    cinemaId: roomData.cinemaId,
    rows: roomData.rows,
    cols: roomData.cols,
    aisleCols: roomData.aisleCols,
    doubleSeatRow: roomData.doubleSeatRow,
    type: roomData.type,
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

  const handleUpdateRoom = async () => {
    const updatedRoomData = await updateRoom(id ?? "", room);
    if (updatedRoomData.success) {
      showSnackbar("Cập nhật room thành công", "success");
      handleClose();
    }
  };

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
            CẬP NHẬT PHÒNG
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <TextFieldInput
                value={room.name}
                onChange={handleChangeValueRoom}
                name="name"
                label="Tên Phòng"
              />
              <TextFieldInput
                value={room.rows}
                onChange={handleChangeValueRoom}
                name="rows"
                label="Nhập số hàng ghế"
              />
              <TextFieldInput
                value={room.cols}
                onChange={handleChangeValueRoom}
                name="cols"
                label="Nhập số cột ghế"
              />
              <TextFieldInput
                value={room.aisleCols ? JSON.stringify(room.aisleCols) : ""}
                onChange={handleChangeValueRoom}
                name="aisleCols"
                label="Nhập cột cần khoảng trống"
              />
              <TextFieldInput
                value={room.doubleSeatRow ? JSON.stringify(room.doubleSeatRow) : ""}
                onChange={handleChangeValueRoom}
                name="doubleSeatRow"
                label="Nhập hàng làm ghế đôi"
              />
            </div>
            <div className="flex items-center justify-center mt-4 gap-2">
              <Button onClick={handleUpdateRoom} title="Sửa" variant="contained" color="primary" />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
