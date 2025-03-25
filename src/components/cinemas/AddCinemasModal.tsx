import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import TextFieldInput from "../TextFieldInput";
import useSnackbar from "../hooks/useSnackbar";
import { ICinemas } from "@/types/Cinemas";
import useCinemas from "@/hooks/useCinemas";

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

export default function AddCinemasModal() {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // hooks
  const { addCinema } = useCinemas();
  const { showSnackbar } = useSnackbar();
  // state
  const [cinemas, setCinemas] = React.useState<ICinemas>({
    name: "",
    image: "",
    cinemaCode: "",
    location: "",
    phone: "",
  });

  // function
  const handleChangeValueCinemas = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCinemas({ ...cinemas, [e.target.name]: e.target.value });
  };

  const handleAddCinemas = async () => {
    const cinemaData = await addCinema(cinemas);
    if (cinemaData.success) {
      showSnackbar("Thêm rạp thành công", "success");
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} title="Thêm Rạp Phim" variant="contained" color="primary" />
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
            <div className="">
              <TextFieldInput onChange={handleChangeValueCinemas} name="name" label="Tên rạp" />
              <TextFieldInput onChange={handleChangeValueCinemas} name="image" label="Hình ảnh" />
              <TextFieldInput
                onChange={handleChangeValueCinemas}
                name="cinemaCode"
                label="Mã Code"
              />
              <TextFieldInput onChange={handleChangeValueCinemas} name="location" label="Địa chỉ" />
              <TextFieldInput
                onChange={handleChangeValueCinemas}
                name="phone"
                label="Số điện thoại"
              />
            </div>

            <div className="flex items-center justify-center mt-4 gap-2">
              <Button onClick={handleAddCinemas} title="Thêm" variant="contained" color="primary" />
              <Button onClick={handleClose} title="Đóng" variant="contained" color="error" />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
