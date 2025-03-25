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

interface UpdateCinemasModalProps {
  cinema: ICinemas;
}
export default function UpdateCinemasModal({ cinema: cinemaData }: UpdateCinemasModalProps) {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const id = cinemaData._id;
  // hooks
  const { updateCinema } = useCinemas();
  const { showSnackbar } = useSnackbar();
  // state
  const [cinemas, setCinemas] = React.useState<ICinemas>({
    name: cinemaData.name,
    image: cinemaData.image,
    cinemaCode: cinemaData.cinemaCode,
    location: cinemaData.location,
    phone: cinemaData.location,
  });

  // function
  const handleChangeValueCinemas = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCinemas({ ...cinemas, [e.target.name]: e.target.value });
  };

  const handleUpdateCinemas = async () => {
    const cinemaData = await updateCinema(id ?? "", cinemas);
    if (cinemaData.success) {
      showSnackbar("Cập nhật rạp thành công", "success");
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
            THÊM PHIM
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <TextFieldInput
                value={cinemas.name}
                onChange={handleChangeValueCinemas}
                name="name"
                label="Tên rạp"
              />
              <TextFieldInput
                value={cinemas.image}
                onChange={handleChangeValueCinemas}
                name="image"
                label="Hình ảnh"
              />
              <TextFieldInput
                value={cinemas.cinemaCode}
                onChange={handleChangeValueCinemas}
                name="cinemaCode"
                label="Mã Code"
              />
              <TextFieldInput
                value={cinemas.location}
                onChange={handleChangeValueCinemas}
                name="location"
                label="Địa chỉ"
              />
              <TextFieldInput
                value={cinemas.phone}
                onChange={handleChangeValueCinemas}
                name="phone"
                label="Số điện thoại"
              />
            </div>

            <div className="flex items-center justify-center mt-4 gap-2">
              <Button
                onClick={handleUpdateCinemas}
                title="Sửa"
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
