"use client";
import AddCinemasModal from "@/components/cinemas/AddCinemasModal";
import CinemasTable from "@/components/cinemas/CinemasTable";
import TextFieldInput from "@/components/TextFieldInput";
import useCinemas from "@/hooks/useCinemas";

function Cinemas() {
  const { cinemas } = useCinemas();
  if (!cinemas) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-56">
          <TextFieldInput label="Tìm kiếm rạp phim..." name="search" type="search" size="small" />
        </div>
        <h1 className="text-4xl font-bold tracking-widest">RẠP PHIM</h1>
        <div className="w-56 text-right">
          <AddCinemasModal />
        </div>
      </div>
      <div className="mt-2">
        <CinemasTable cinemas={cinemas} />
      </div>
    </div>
  );
}

export default Cinemas;
