import AvatarUser from "@/components/AvatarUser";
import { AuthContext } from "@/contexts/AuthContextProvider/AuthContextProvider";
import { useContext } from "react";

function Navbar() {
  const { authState } = useContext(AuthContext);
  const fullName = authState?.user?.fullName;
  const words = fullName?.split(" "); // ["Hồ", "Tấn", "Hùng"]
  const lastWord = words && words[words.length - 1]; // "Hùng"
  const firstLetter = lastWord?.charAt(0); // "H"
  return (
    <div className="h-16 flex items-center justify-between ">
      <div>
        <h1 className="text-3xl font-bold tracking-widest">ADMIN BICKIE</h1>
        <span>Chào, {authState.user?.fullName}</span>
      </div>
      <div>
        <AvatarUser firstLetter={firstLetter} />
      </div>
    </div>
  );
}

export default Navbar;
