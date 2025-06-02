import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useStatistics from "@/hooks/useStatistics";
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

export default function TopSellingMovies() {
  const { hotMovies } = useStatistics();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell align="center">Ảnh</StyledTableCell>
            <StyledTableCell align="center">Tên phim</StyledTableCell>
            <StyledTableCell align="center">Đạo diễn</StyledTableCell>
            <StyledTableCell align="center">Số ghế đã đặt</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotMovies?.hotMovies.map((item, index) => (
            <StyledTableRow key={item.movie._id}>
              <StyledTableCell align="center" component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className="flex items-center justify-center">
                  <Image
                    src={item.movie.poster}
                    alt="img-film text-center"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{item.movie.title}</StyledTableCell>
              <StyledTableCell align="center">{item.movie.director}</StyledTableCell>
              <StyledTableCell align="center">{item.totalSeats}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
