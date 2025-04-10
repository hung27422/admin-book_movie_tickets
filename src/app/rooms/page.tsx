"use client";

import { useState } from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import Image from "next/image";

import AddRoomModal from "@/components/rooms/AddRoomModal";
import RoomTable from "@/components/rooms/RoomTable";
import TextFieldInput from "@/components/TextFieldInput";
import useCinemas from "@/hooks/useCinemas";
import useRooms from "@/hooks/useRooms";
import { ICinemas } from "@/types/Cinemas";

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
        <Box component="li" sx={{ "& > Image": { mr: 2, flexShrink: 0 } }} {...props}>
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
      renderInput={(params) => <TextField {...params} label="Lọc phòng theo rạp" size="small" />}
    />
  </Box>
);

function Room() {
  const [idCinemaState, setIdCinemaState] = useState("");

  const { cinemas } = useCinemas();
  const { rooms } = useRooms();
  const { getRoomsByCinemaId } = useRooms({ idCinema: idCinemaState });

  const data = getRoomsByCinemaId ?? rooms;

  if (!rooms && !getRoomsByCinemaId) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput
            label="Tìm kiếm phòng chiếu..."
            name="search"
            type="search"
            size="small"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">PHÒNG CHIẾU</h1>
        <div className="w-56 text-right">
          <AddRoomModal />
        </div>
      </div>

      <div className="mt-2">
        <div className="mb-2">
          <CinemaSelect cinemas={cinemas ?? []} onChange={setIdCinemaState} />
        </div>
        <RoomTable rooms={data} />
      </div>
    </div>
  );
}

export default Room;
