import AvatarUser from "@/components/AvatarUser";

function Navbar() {
  return (
    <div className="h-16 flex items-center justify-between ">
      <div>
        <h1 className="text-3xl font-bold tracking-widest">ADMIN BICKIE</h1>
        <span>Chào, Hồ Tấn Hùng</span>
      </div>
      <div>
        <AvatarUser />
      </div>
    </div>
  );
}

export default Navbar;
