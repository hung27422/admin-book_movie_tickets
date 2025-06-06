"use client";
import SnackTable from "@/components/snacks/SnackTable";
import TextFieldInput from "@/components/TextFieldInput";
import useCinemas from "@/hooks/useCinemas";
import useSnacks from "@/hooks/useSnacks";
import { ICinemas } from "@/types/Cinemas";
import { Autocomplete, Box, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AddSnackModal from "../../components/snacks/AddSnackModal";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/hooks/usePagination";

const CinemaSelect = ({
  cinemas,
  onChange,
}: {
  cinemas: ICinemas[];
  onChange: (id: string) => void;
}) => (
  <Box sx={{ minWidth: 120 }}>
    <Autocomplete
      id="cinema-select"
      options={cinemas}
      autoHighlight
      getOptionLabel={(cinema) => cinema.name}
      onChange={(_, value) => onChange(value?._id || "")}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Image
            loading="lazy"
            width={30}
            height={30}
            src={option.image}
            alt=""
            style={{ objectFit: "cover" }}
            className="mr-3 rounded-lg"
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Chọn rạp để lọc bắp nước" size="small" />
      )}
    />
  </Box>
);

function Snack() {
  const [cinemaId, setCinemaId] = useState("");

  const { handleChange, page } = usePagination();
  const { cinemaAll } = useCinemas();
  const { snacks, dataSnacksByCinema } = useSnacks({ cinemaId: cinemaId, page: page, limit: 2 });

  const data = dataSnacksByCinema ? dataSnacksByCinema : snacks?.data;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput label="Tìm kiếm bắp nước..." name="search" type="search" size="small" />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">BẮP NƯỚC</h1>
        <div className="w-56 text-right">
          <AddSnackModal />
        </div>
      </div>
      <div className="mt-2">
        <CinemaSelect cinemas={cinemaAll ?? []} onChange={setCinemaId} />
        <div className="mt-3">
          <SnackTable snacks={data} />
        </div>
      </div>
      {snacks && snacks.totalPage >= 2 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination totalPages={snacks.totalPage} page={page} handleChange={handleChange} />
        </div>
      )}
    </div>
  );
}

export default Snack;
