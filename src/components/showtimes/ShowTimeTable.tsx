"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IShowTime } from "@/types/ShowTime";
import ShowTimeActionButton from "./ShowTimeActionButton";
import formatDate from "@/utils/formatDate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dde8ea", // Đổi màu header thành #F2C2C2
    color: theme.palette.common.black, // Đổi màu chữ thành đen để dễ đọc
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface ShowTimeTableProps {
  showtimes: IShowTime[] | undefined;
}
export default function ShowTimeTable({ showtimes }: ShowTimeTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên Phim</StyledTableCell>
            <StyledTableCell align="center">Tên Rạp</StyledTableCell>
            <StyledTableCell align="center">Tên phòng</StyledTableCell>
            <StyledTableCell align="center">Giờ bắt đầu</StyledTableCell>
            <StyledTableCell align="center">Giờ kết thúc</StyledTableCell>
            <StyledTableCell align="center">Giá vé</StyledTableCell>
            <StyledTableCell align="center">Ghế sẵn có</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {showtimes && showtimes.length > 0 ? (
            showtimes.map((showtime) => (
              <StyledTableRow key={showtime._id}>
                <StyledTableCell align="center">{showtime?.movie?.title}</StyledTableCell>
                <StyledTableCell align="center">{showtime?.cinema?.name}</StyledTableCell>
                <StyledTableCell align="center">{showtime?.room?.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(showtime.startTime, true)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(showtime?.endTime ?? "", true)}
                </StyledTableCell>
                <StyledTableCell align="center">{showtime.price}</StyledTableCell>
                <StyledTableCell align="center">{showtime.availableSeats}</StyledTableCell>
                <StyledTableCell align="center">
                  <ShowTimeActionButton showtime={showtime} />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <div className="text-2xl py-6">Hãy thêm suất chiếu!!!</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
