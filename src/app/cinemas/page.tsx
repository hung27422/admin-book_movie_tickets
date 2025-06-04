"use client";
import AddCinemasModal from "@/components/cinemas/AddCinemasModal";
import CinemasTable from "@/components/cinemas/CinemasTable";
import useDebounce from "@/components/hooks/useDebounce";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/Pagination";
import TextFieldInput from "@/components/TextFieldInput";
import useCinemas from "@/hooks/useCinemas";
import { useCallback, useState } from "react";

function Cinemas() {
  //state
  const [valueSearch, setValueSearch] = useState<string>("");
  // debounce
  const debouncedValue = useDebounce(valueSearch, 300);
  // hooks
  const { page, handleChange } = usePagination();
  const { cinemas, dataCinemaByName } = useCinemas({
    name: debouncedValue ?? "",
    page: page,
    limit: 10,
  });

  // function
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  }, []);

  if (!cinemas) return <div>Loading...</div>;
  const data = dataCinemaByName ? dataCinemaByName : cinemas.data;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-60">
          <TextFieldInput
            onChange={handleSearchChange}
            label="Tìm kiếm rạp phim theo tên..."
            name="search"
            type="search"
            size="small"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">RẠP PHIM</h1>
        <div className="w-56 text-right">
          <AddCinemasModal />
        </div>
      </div>
      <div className="mt-2">
        <CinemasTable cinemas={data} />
      </div>
      {cinemas.totalPages >= 2 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination totalPages={cinemas.totalPages} page={page} handleChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default Cinemas;
