"use client";
import AddShowTimeModal from "@/components/showtimes/AddShowTimeModal";
import ShowTimeTable from "@/components/showtimes/ShowTimeTable";
import TextFieldInput from "@/components/TextFieldInput";
import useCinemas from "@/hooks/useCinemas";
import useRooms from "@/hooks/useRooms";
import useShowTime from "@/hooks/useShowTimes";
import { ICinemas } from "@/types/Cinemas";
import { IRoom } from "@/types/Rooms";
import { Autocomplete, Box, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
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
      renderInput={(params) => (
        <TextField {...params} label="Chọn rạp để lấy thông tin phòng" size="small" />
      )}
    />
  </Box>
);
const RoomSelect = ({ rooms, onChange }: { rooms: IRoom[]; onChange: (id: string) => void }) => (
  <Box sx={{ minWidth: 120 }}>
    <Autocomplete
      id="cinema-select"
      options={rooms}
      autoHighlight
      getOptionLabel={(room) => room.name}
      onChange={(_, value) => onChange(value?._id || "")}
      renderInput={(params) => (
        <TextField {...params} label="Lọc suất chiếu theo phòng" size="small" />
      )}
    />
  </Box>
);
function ShowTime() {
  const [idCinemaState, setIdCinemaState] = useState("");
  const [idRoomState, setIdRoomState] = useState("");
  //hooks
  const { showtimes } = useShowTime();
  const { cinemas } = useCinemas();
  const { getRoomsByCinemaId } = useRooms({ idCinema: idCinemaState });
  const { getShowTimeByRoomId } = useShowTime({ idRoom: idRoomState });

  const data = getShowTimeByRoomId ? getShowTimeByRoomId : showtimes;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput label="Tìm kiếm suất chiếu..." name="search" type="search" size="small" />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">SUẤT CHIẾU</h1>
        <div className="w-56 text-right">
          <AddShowTimeModal />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex flex-col gap-2 mb-2">
          <CinemaSelect cinemas={cinemas ?? []} onChange={setIdCinemaState} />
          <RoomSelect rooms={getRoomsByCinemaId ?? []} onChange={setIdRoomState} />
        </div>
        <ShowTimeTable showtimes={data} />
      </div>
    </div>
  );
}

export default ShowTime;
