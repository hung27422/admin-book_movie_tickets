import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  totalPages: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
function Pagination({ totalPages, page, handleChange }: PaginationProps) {
  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  );
}

export default Pagination;
