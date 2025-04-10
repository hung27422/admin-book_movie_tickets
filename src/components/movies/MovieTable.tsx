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
import { IMovie } from "@/types/Movies";
import Image from "next/image";
import MovieActionButton from "./MovieActionButton";
import dayjs from "dayjs";

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
  movies: IMovie[] | undefined;
}
function MovieTable({ movies }: MovieTableProps) {
  if (!movies) return <div>Loading...</div>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Ảnh</StyledTableCell>
            <StyledTableCell align="center">Tên phim</StyledTableCell>
            <StyledTableCell align="center">Đạo diễn</StyledTableCell>
            <StyledTableCell align="center">Quốc gia</StyledTableCell>
            <StyledTableCell align="center">Trạng thái</StyledTableCell>
            <StyledTableCell align="center">Ngày chiếu</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies?.map((movie) => {
            let type = "";
            if (movie.status === "NOWSHOWING") type = "Đang chiếu";
            if (movie.status === "COMINGSOON") type = "Sắp chiếu";
            if (movie.status === "TEMPORARILYCLOSED") type = "Tạm ngưng";
            const formatReleaseDate = (dateString: string) => {
              return dayjs(dateString).format("DD/MM/YYYY");
            };
            return (
              <StyledTableRow key={movie._id}>
                <StyledTableCell align="center" sx={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    src={movie.poster}
                    alt="img-poster"
                    width={40}
                    height={20}
                    className="rounded-md"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{movie.title}</StyledTableCell>
                <StyledTableCell align="center">{movie.director}</StyledTableCell>
                <StyledTableCell align="center">{movie.country}</StyledTableCell>
                <StyledTableCell align="center">{type || movie.status}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatReleaseDate(movie.releaseDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MovieActionButton movie={movie} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(MovieTable);
