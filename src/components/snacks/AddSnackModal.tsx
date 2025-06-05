"use client";
import { Modal, Box, Typography, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import useCinemas from "@/hooks/useCinemas";
import { useSnackbar } from "notistack";
import useSnacks from "@/hooks/useSnacks";
import { ISnack } from "@/types/Snack";
import TextFieldInput from "../TextFieldInput";

const AddSnackModal = () => {
  const [open, setOpen] = useState(false);
  const [snackData, setSnackData] = useState<ISnack>({
    name: "",
    price: 0,
    description: "",
    cinemaId: { _id: "" },
  });

  const { enqueueSnackbar } = useSnackbar();
  const { cinemaAll } = useCinemas();
  const { addSnack } = useSnacks();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSnackData({
      ...snackData,
      [name]: name === "price" ? +value : name === "cinemaId" ? { _id: value } : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addSnack(snackData);
      enqueueSnackbar("Thêm bắp nước thành công!", { variant: "success" });
      setOpen(false);
      setSnackData({ name: "", price: 0, description: "", cinemaId: { _id: "" } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      enqueueSnackbar("Lỗi khi thêm bắp nước!", { variant: "error" });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Thêm bắp nước
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="w-16"></div>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{
                letterSpacing: 2,
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              THÊM BẮP NƯỚC
            </Typography>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>
              Hủy
            </Button>
          </Box>

          <Box id="modal-description" sx={{ mt: 2 }}>
            <TextFieldInput
              label="Tên bắp nước"
              name="name"
              value={snackData.name}
              onChange={handleChange}
            />
            <TextFieldInput label="Giá" name="price" onChange={handleChange} />
            <TextFieldInput
              label="Mô tả"
              name="description"
              value={snackData.description}
              onChange={handleChange}
            />
            <div className="mt-1">
              <TextField
                select
                label="Chọn rạp"
                name="cinemaId"
                fullWidth
                className="mt-6"
                value={snackData.cinemaId._id}
                onChange={handleChange}
              >
                {cinemaAll?.map((cinema) => (
                  <MenuItem key={cinema._id} value={cinema._id}>
                    {cinema.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Box className="flex justify-center gap-4 mt-6">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddSnackModal;

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
