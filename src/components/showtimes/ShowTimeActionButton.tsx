import { IShowTime } from "@/types/ShowTime";
import DeleteShowTimeModal from "./DeleteShowTimeModal";
import UpdateShowTimeModal from "./UpdateShowTimeModal";

interface ShowTimeActionButtonProp {
  showtime: IShowTime;
}
function ShowTimeActionButton({ showtime }: ShowTimeActionButtonProp) {
  return (
    <div className="flex items-center justify-center gap-2">
      <DeleteShowTimeModal showtime={showtime} />
      <UpdateShowTimeModal showtime={showtime} />
    </div>
  );
}

export default ShowTimeActionButton;
