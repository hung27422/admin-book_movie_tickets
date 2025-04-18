import { ISnack } from "@/types/Snack";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SnackActionButton from "./SnackActionButton";

// Styled giống ShowTimeTable
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dde8ea",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface SnackTableProps {
  snacks: ISnack[] | undefined;
}

function SnackTable({ snacks }: SnackTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên</StyledTableCell>
            <StyledTableCell align="center">Mô tả</StyledTableCell>
            <StyledTableCell align="center">Giá</StyledTableCell>
            <StyledTableCell align="center">Rạp</StyledTableCell>
            <StyledTableCell align="center">Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {snacks?.map((snack) => (
            <StyledTableRow key={snack._id}>
              <StyledTableCell align="center">{snack.name}</StyledTableCell>
              <StyledTableCell align="center">{snack.description}</StyledTableCell>
              <StyledTableCell align="center">{snack.price.toLocaleString()}₫</StyledTableCell>
              <StyledTableCell align="center">{snack?.cinemaId?.name}</StyledTableCell>
              <StyledTableCell align="center">
                <SnackActionButton snack={snack} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SnackTable;
