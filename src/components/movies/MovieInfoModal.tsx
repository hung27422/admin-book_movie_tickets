import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import Image from "next/image";
import { IMovie } from "@/types/Movies";
import dayjs from "dayjs";

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
  movie: IMovie;
}
export default function MovieInfoModal({ movie }: MovieInfoModalProps) {
  // MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // constants
  const MAX_LENGTH = 300;
  let type = "";
  //state
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  // format
  if (movie.status === "NOWSHOWING") type = "Đang chiếu";
  if (movie.status === "COMINGSOON") type = "Sắp chiếu";
  if (movie.status === "TEMPORARILYCLOSED") type = "Tạm ngưng";
  //function
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };
  const formatReleaseDate = (dateString: string) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };
  const description = (
    <>
      {movie.description.length > MAX_LENGTH ? (
        <>
          {showFullDescription ? movie.description : `${movie.description.slice(0, MAX_LENGTH)}...`}
          <button onClick={toggleDescription} className="text-blue-500 hover:underline ml-2">
            {showFullDescription ? "Ẩn bớt" : "Xem thêm"}
          </button>
        </>
      ) : (
        movie.description
      )}
    </>
  );
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
            <h2 className="text-2xl tracking-widest font-semibold text-center ">THÔNG TIN PHIM</h2>
            <Button onClick={handleClose} color="error" title="X" variant="contained" />
          </div>
          <div className="grid grid-cols-12 mt-4">
            <div className="col-span-4 text-center">
              <Image
                src={movie.poster}
                alt="img-movie"
                width={180}
                height={200}
                className="rounded-md mx-auto"
              />
              <Typography variant="body1" gutterBottom sx={{ marginTop: "10px" }}>
                <strong>Ngày chiếu:</strong> {formatReleaseDate(movie.releaseDate)}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ marginTop: "10px" }}>
                <strong>Thời lượng :</strong> {movie.duration} phút
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ marginTop: "10px" }}>
                <strong>Đánh giá :</strong> {movie.rating} Sao
              </Typography>
            </div>
            <div className="col-span-8">
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Tên phim: {movie.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mô tả: </strong>
                {description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Thể loại:</strong> {movie.genre}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Đạo diễn:</strong> {movie.director}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Diễn viên:</strong> {movie.cast}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Trailer:</strong> {movie.trailer}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Độ tuổi:</strong> {movie.ageRate}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Quốc gia:</strong> {movie.country}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phụ đề:</strong> {movie.caption}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Trạng thái:</strong> {type}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Người thêm phim:</strong> {movie.user?.fullName}
              </Typography>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
