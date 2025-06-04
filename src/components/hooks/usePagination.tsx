import { useState } from "react";

export default function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return {
    page,
    setPage,
    handleChange,
  };
}
