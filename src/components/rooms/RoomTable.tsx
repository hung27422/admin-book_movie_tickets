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
import RoomActionButton from "./RoomActionButton";
import { IRoom } from "@/types/Rooms";

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
interface MovieTableProps {
  rooms: IRoom[];
}
export default function RoomTable({ rooms }: MovieTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên Phòng</StyledTableCell>

            <StyledTableCell align="center">Số ghế</StyledTableCell>
            <StyledTableCell align="center">Loại phòng</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => {
            return (
              <StyledTableRow key={room._id}>
                <StyledTableCell align="center" sx={{ display: "flex", justifyContent: "center" }}>
                  {room?.name}
                </StyledTableCell>
                <StyledTableCell align="center">{room?.seats?.length}</StyledTableCell>
                <StyledTableCell align="center">{room.type}</StyledTableCell>

                <StyledTableCell align="center">
                  <RoomActionButton room={room} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
