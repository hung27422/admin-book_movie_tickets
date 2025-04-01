import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import useSnackbar from "../hooks/useSnackbar";
import useShowTime from "@/hooks/useShowTimes";
import { IShowTime } from "@/types/ShowTime";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteShowTimeModal {
  showtime: IShowTime;
}
export default function DeleteShowTimeModal({ showtime: showtimeData }: DeleteShowTimeModal) {
  const id = showtimeData._id;
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // hooks
  const { deleteShowtime } = useShowTime();
  const { showSnackbar } = useSnackbar();

  // function update
  const handleDeleteShowTime = () => {
    deleteShowtime(id ?? "").then(() => {
      showSnackbar("Xóa suất chiếu thành công!", "success");
      handleClose();
    });
  };
  return (
    <div>
      <Button onClick={handleOpen} title="Xóa" variant="contained" color="error" />
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
            sx={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}
          >
            Bạn có chắc chắn muốn xóa suất chiếu <br />
            <span className="text-red-500">{showtimeData?.movie?.title}</span> <br />
            của phòng <br />
            <span className="text-red-500"> {showtimeData?.room?.name}</span>
          </Typography>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              onClick={handleDeleteShowTime}
              title="Chắc chắn"
              variant="contained"
              color="primary"
            />
            <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
