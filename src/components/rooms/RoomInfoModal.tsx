import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import { IRoom } from "@/types/Rooms";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface RoomInfoModalProps {
  room: IRoom;
}

export default function RoomInfoModal({ room }: RoomInfoModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const groupedSeats = room.seats?.reduce((acc, seat) => {
    if (!seat.position || typeof seat.position.row === "undefined") return acc; // Kiểm tra tránh lỗi
    const rowKey = seat.position.row.toString(); // Nhóm theo số hàng
    if (!acc[rowKey]) acc[rowKey] = [];
    acc[rowKey].push(seat);
    return acc;
  }, {} as Record<string, typeof room.seats>);

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
            <h2 className="text-2xl tracking-widest font-semibold text-center">THÔNG TIN PHÒNG</h2>
            <Button onClick={handleClose} color="error" title="X" variant="contained" />
          </div>
          <div className="space-y-2">
            {Object.entries(groupedSeats || {}).map(([row, seats]) => {
              const seatRow: React.ReactNode[] = [];
              for (let i = 0; i < seats.length; i++) {
                const seat = seats[i];

                if (seat.type === "DOUBLE") {
                  seatRow.push(
                    <div
                      key={seat._id}
                      className="w-16 mr-3 h-8 flex items-center justify-center bg-blue-500 rounded-md text-white font-bold"
                    >
                      {seat?.seatNumber} - {seats[i + 1]?.seatNumber}
                    </div>
                  );
                  i++; // Bỏ qua ghế tiếp theo vì đã gộp
                } else {
                  seatRow.push(
                    <div
                      key={seat._id}
                      className={`${
                        seat.type === "AISLE" ? "mr-6" : ""
                      } w-8 h-8 flex items-center justify-center bg-gray-500 rounded-md text-white font-bold`}
                    >
                      {seat?.seatNumber}
                    </div>
                  );
                }
              }

              return (
                <div key={row} className="flex gap-2">
                  {seatRow}
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
