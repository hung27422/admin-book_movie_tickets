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
import { ICinemas } from "@/types/Cinemas";
import CinemasActionButton from "./CinemasActionButton";
import Image from "next/image";

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
interface CinemasTable {
  cinemas: ICinemas[];
}
function CinemasTable({ cinemas }: CinemasTable) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Logo</StyledTableCell>
            <StyledTableCell align="center">Code</StyledTableCell>
            <StyledTableCell align="center">Tên rạp</StyledTableCell>
            <StyledTableCell align="center">Địa chỉ</StyledTableCell>
            <StyledTableCell align="center">Số điện thoại</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cinemas.map((cinema) => {
            // const formatReleaseDate = (dateString: string) => {
            //   return dayjs(dateString).format("DD/MM/YYYY");
            // };
            return (
              <StyledTableRow key={cinema._id}>
                <StyledTableCell align="center">
                  {cinema.image ? (
                    <div className="flex items-center justify-center h-full">
                      <Image
                        src={cinema.image}
                        alt="img-poster"
                        width={40}
                        height={20}
                        className="rounded-md h-full"
                      />
                    </div>
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="center">{cinema.cinemaCode}</StyledTableCell>
                <StyledTableCell align="center">{cinema.name}</StyledTableCell>
                <StyledTableCell align="center">{cinema.location}</StyledTableCell>
                <StyledTableCell align="center">{cinema.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  <CinemasActionButton cinema={cinema} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(CinemasTable);
