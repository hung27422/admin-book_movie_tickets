import { IRoom } from "@/types/Rooms";
import RoomInfoModal from "./RoomInfoModal";
import DeleteRoomModal from "./DeleteRoomModal";
import UpdateRoomModal from "./UpdateRoomModal";

interface RoomActionButtonProp {
  room: IRoom;
}
function RoomActionButton({ room }: RoomActionButtonProp) {
  return (
    <div className="flex items-center justify-center gap-2">
      <RoomInfoModal room={room} />
      <UpdateRoomModal room={room} />
      <DeleteRoomModal room={room} />
    </div>
  );
}

export default RoomActionButton;
