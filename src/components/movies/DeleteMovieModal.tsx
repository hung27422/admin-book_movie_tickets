import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import { IMovie } from "@/types/Movies";
import useMovies from "@/hooks/useMovies";
import useSnackbar from "../hooks/useSnackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteMovieModal {
  movie: IMovie;
}
export default function DeleteMovieModal({ movie: movieData }: DeleteMovieModal) {
  // const today = new Date().toISOString().split("T")[0];
  const id = movieData._id;
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // hooks
  const { deleteMovie } = useMovies();
  const { showSnackbar } = useSnackbar();

  // function update
  const handleDeleteMovie = () => {
    deleteMovie(id ?? "").then(() => {
      showSnackbar("Xóa phim thành công!", "success");
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
            Bạn có chắc chắn muốn xóa phim <br />
            <span className="text-red-500">{movieData.title}</span>
          </Typography>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              onClick={handleDeleteMovie}
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
