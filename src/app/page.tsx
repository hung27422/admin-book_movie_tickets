"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import WeekendIcon from "@mui/icons-material/Weekend";
import TopSellingMovies from "@/components/dashboard/TopSellingMovies";
const overview = [
  {
    id: 1,
    title: "Doanh Thu",
    icon: <AddBoxIcon className="text-orange-500" />,
    result: "216K",
  },
  {
    id: 2,
    title: "Tổng số vé đã bán",
    icon: <ReceiptIcon className="text-green-500" />,
    result: "20",
  },
  {
    id: 3,
    title: "Tổng số suất chiếu",
    icon: <AccessAlarmsIcon className="text-yellow-500" />,
    result: "200",
  },
  {
    id: 4,
    title: "Tổng số ghế còn trống",
    icon: <WeekendIcon className="text-yellow-500" />,
    result: "2020",
  },
];
export default function Home() {
  return (
    <div>
      <div className="bg-white py-4 rounded-md grid grid-cols-4">
        {overview.map((item) => {
          return (
            <div
              key={item.id}
              className="col-span-1 flex items-start justify-center border-r border-gray-300 last:border-r-0 "
            >
              <div className="flex items-center justify-center mt-1 mr-4 size-6 rounded-full">
                {item.icon}
              </div>
              <div className="text-center">
                <p className="text-xl">{item.title}</p>
                <div className="text-2xl mt-1">
                  <span className="pr-1 font-bold">{item.result}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white mt-4 p-4 rounded-md">
        <h2 className="text-2xl text-center font-semibold mb-2">Danh Sách Phim Bán Chạy Nhất</h2>
        <div>
          <TopSellingMovies />
        </div>
      </div>

      <div className="bg-white mt-4 p-4 rounded-md">
        <h2 className="text-2xl text-center font-semibold mb-2">Thống Kê Theo Rạp</h2>
        <div className="grid grid-cols-6 gap-2">
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
          <div className="text-center border-2 border-[#F2C2C2] p-2 rounded-lg ">
            <h4 className="text-lg font-semibold text-red-400">BHD Long Khánh</h4>
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center">
                <p className="text-gray-700">SL Khách: </p>
                <p className="font-semibold"> 10K</p>
              </div>
              <div className="flex items-center">
                <p>Doanh Thu: </p>
                <p className="font-semibold"> 100.000 VNĐ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
