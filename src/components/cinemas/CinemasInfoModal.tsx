import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
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

interface MovieInfoModalProps {
  cinema: ICinemas;
}
export default function CinemasInfoModal({ cinema }: MovieInfoModalProps) {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const formatReleaseDate = (dateString: string) => {
  //   return dayjs(dateString).format("DD/MM/YYYY");
  // };

  return (
    <div>
      <Button onClick={handleOpen} color="primary" title="Xem" variant="contained" />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <div className="w-16"></div>
            <h2 className="text-2xl tracking-widest font-semibold text-center ">THÔNG TIN RẠP</h2>
            <Button onClick={handleClose} color="error" title="X" variant="contained" />
          </div>
          <div className="grid grid-cols-12 mt-4">
            <div className="col-span-4 text-center">{cinema?.name}</div>
            <div className="col-span-8"></div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
