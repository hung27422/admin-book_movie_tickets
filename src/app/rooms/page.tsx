"use client";
import AddRoomModal from "@/components/rooms/AddRoomModal";
import RoomTable from "@/components/rooms/RoomTable";
import TextFieldInput from "@/components/TextFieldInput";
import useRooms from "@/hooks/useRooms";

function Room() {
  const { rooms } = useRooms();
  if (!rooms) return <div>Loading...</div>;

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
        <RoomTable rooms={rooms} />
      </div>
    </div>
  );
}

export default Room;
