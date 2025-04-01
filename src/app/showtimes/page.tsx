"use client";
import AddShowTimeModal from "@/components/showtimes/AddShowTimeModal";
import ShowTimeTable from "@/components/showtimes/ShowTimeTable";
import TextFieldInput from "@/components/TextFieldInput";
import useShowTime from "@/hooks/useShowTimes";

function ShowTime() {
  const { showtimes } = useShowTime();
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
        <ShowTimeTable showtimes={showtimes} />
      </div>
    </div>
  );
}

export default ShowTime;
