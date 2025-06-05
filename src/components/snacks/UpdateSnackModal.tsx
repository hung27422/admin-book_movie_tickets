import { Modal, Box, Button, TextField, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useCinemas from "@/hooks/useCinemas";
import useSnacks from "@/hooks/useSnacks";
import { ISnack } from "@/types/Snack";
import useSnackbar from "../hooks/useSnackbar";

interface UpdateSnackModalProps {
  snack: ISnack;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UpdateSnackModal = ({ snack }: UpdateSnackModalProps) => {
  const id = snack._id;
  const [open, setOpen] = useState(false);
  const [snackData, setSnackData] = useState<ISnack>({
    name: snack.name,
    price: snack.price,
    description: snack.description,
    cinemaId: { _id: snack.cinemaId._id },
  });
  const { showSnackbar } = useSnackbar();
  const { cinemaAll } = useCinemas();
  const { updateSnack } = useSnacks();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSnackData({ ...snackData, [name]: name === "price" ? +value : value });
  };

  const handleSubmit = async () => {
    try {
      await updateSnack(id ?? "", snackData);
      showSnackbar(`Sửa ${snack.name} thành công!`, "success");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showSnackbar(`Lỗi khi sửa ${snack.name}!`, "error");
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Sửa
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Cập nhật bắp nước
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Tên bắp nước"
              name="name"
              fullWidth
              value={snackData.name}
              onChange={handleChange}
            />
            <TextField
              label="Giá"
              name="price"
              type="number"
              fullWidth
              value={snackData.price}
              onChange={handleChange}
            />
            <TextField
              label="Mô tả"
              name="description"
              fullWidth
              multiline
              minRows={2}
              value={snackData.description}
              onChange={handleChange}
            />
            <TextField
              select
              label="Chọn rạp"
              name="cinemaId"
              fullWidth
              value={snackData.cinemaId._id}
              onChange={(e) =>
                setSnackData({
                  ...snackData,
                  cinemaId: { _id: e.target.value },
                })
              }
            >
              {cinemaAll?.map((cinema) => (
                <MenuItem key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Lưu thay đổi
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateSnackModal;
