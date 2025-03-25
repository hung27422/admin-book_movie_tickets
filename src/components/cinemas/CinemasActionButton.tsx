import { ICinemas } from "@/types/Cinemas";
import CinemasInfoModal from "./CinemasInfoModal";
import UpdateCinemasModal from "./UpdateCinemasModal";
import DeleteCinemasModal from "./DeleteCinemasModal";

interface CinemasActionButtonProps {
  cinema: ICinemas;
}
function CinemasActionButton({ cinema }: CinemasActionButtonProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <CinemasInfoModal cinema={cinema} />
      <UpdateCinemasModal cinema={cinema} />
      <DeleteCinemasModal cinema={cinema} />
    </div>
  );
}

export default CinemasActionButton;
