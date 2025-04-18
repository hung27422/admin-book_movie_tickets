import { ISnack } from "@/types/Snack";
import DeleteSnackModal from "./DeleteSnackModal";
import UpdateSnackModal from "./UpdateSnackModal";

interface SnackActionButtonProps {
  snack: ISnack;
}
function SnackActionButton({ snack }: SnackActionButtonProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <UpdateSnackModal snack={snack} />
      <DeleteSnackModal snack={snack} />
    </div>
  );
}

export default SnackActionButton;
