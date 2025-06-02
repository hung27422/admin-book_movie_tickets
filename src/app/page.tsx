"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import WeekendIcon from "@mui/icons-material/Weekend";
import TopSellingMovies from "@/components/dashboard/TopSellingMovies";
import useStatistics from "@/hooks/useStatistics";
import SelectDateStatistic from "@/components/selectDateStatistic/selectDateStatistic";
import { useAppContext } from "@/contexts/AppContextProvider/AppContextProvider";
import useValidateDateRange from "@/components/hooks/useValidateDateRange";
import useSnackbar from "@/components/hooks/useSnackbar";

export default function Home() {
  const { startDate, endDate } = useAppContext();
  const { showSnackbar } = useSnackbar();
  const formatted = {
    start: startDate?.format("YYYY-MM-DD"),
    end: endDate?.format("YYYY-MM-DD"),
    startTitle: startDate?.format("DD-MM-YYYY"),
    endTitle: endDate?.format("DD-MM-YYYY"),
  };
  useValidateDateRange(startDate, endDate, () => {
    showSnackbar("Ngày kết thúc không được nhỏ hơn ngày bắt đầu.", "error");
  });
  const { statistics, statisticsByCinemas } = useStatistics({
    from: formatted.start,
    to: formatted.end,
  });

  const overview = [
    {
      id: 1,
      title: "Doanh Thu",
      icon: <AddBoxIcon className="text-orange-500" />,
      result: statistics?.data.totalRevenue.toLocaleString(),
    },
    {
      id: 2,
      title: "Tổng số vé đã bán",
      icon: <ReceiptIcon className="text-green-500" />,
      result: statistics?.data.totalTicketsSold,
    },
    {
      id: 3,
      title: "Tổng số suất chiếu",
      icon: <AccessAlarmsIcon className="text-yellow-500" />,
      result: statistics?.data.totalShowtimes,
    },
    {
      id: 4,
      title: "Tổng số ghế còn trống",
      icon: <WeekendIcon className="text-yellow-500" />,
      result: statistics?.data.emptySeats,
    },
  ];
  const month = new Date().getMonth() + 1;

  return (
    <div>
      <div className="flex items-center bg-gray-200 py-2 px-2 rounded-lg mb-4">
        <SelectDateStatistic />
      </div>
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
        <h2 className="text-2xl text-center font-semibold mb-2">
          Danh Sách Phim Bán Chạy Nhất - <span className="text-red-500">Tháng {month}</span>
        </h2>
        <div>
          <TopSellingMovies />
        </div>
      </div>

      <div className="bg-white mt-4 p-4 rounded-md">
        <div className="flex flex-col items-center justify-center mb-2">
          <h2 className="text-2xl text-center font-semibold">
            Thống Kê Theo Rạp
            {!startDate && !endDate && (
              <span>
                <span> -</span>
                <span className="text-red-500"> Tháng {month}</span>
              </span>
            )}
          </h2>
          {startDate && endDate && (
            <h3 className="text-xl text-center font-semibold mb-2">
              Từ ngày
              <span className="text-red-500"> {formatted.startTitle} </span>
              đến ngày
              <span className="text-red-500"> {formatted.endTitle}</span>
            </h3>
          )}
        </div>
        {statisticsByCinemas && statisticsByCinemas?.cinemas.length > 0 ? (
          <div className="grid grid-cols-5 gap-2">
            {statisticsByCinemas?.cinemas.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-span-1 text-center border-2 border-[#F2C2C2] p-2 rounded-lg "
                >
                  <h4 className="text-lg font-semibold text-red-400">{item.cinemaName}</h4>
                  <div className="flex flex-col items-center justify-start">
                    <div className="flex items-center">
                      <p className="text-gray-700">SL Ghế: </p>
                      <p className="font-semibold"> {item.totalSeats}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-700">SL Đơn: </p>
                      <p className="font-semibold"> {item.totalBookings}</p>
                    </div>
                    <div className="flex items-center">
                      <p>Doanh Thu: </p>
                      <p className="font-semibold"> {item.totalRevenue} VNĐ</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h3 className="text-xl text-center font-semibold mb-2">
              Không có dữ liệu ở khoảng thời gian này!!!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
