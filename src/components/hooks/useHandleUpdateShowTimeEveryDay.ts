import useShowTime from "@/hooks/useShowTimes";
import { useEffect, useRef } from "react";

// ----------> Hàm này để tôi dùng update tự động suất chiếu... <------------

function useHandleUpdateShowTimeEveryDay() {
  const { updateShowTimeEveryday } = useShowTime();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; // nếu đã chạy rồi thì không chạy lại
    initialized.current = true;
    const idsDisable = ["68417491a6d3481c9686b7c4"];
    const ids = [
      "684016bd5dac6becaa80414a",
      "68401a125dac6becaa805e64",
      "684019ac5dac6becaa804c35",
      "68401ac85dac6becaa806710",
      "68401aa55dac6becaa806640",
      "68401af45dac6becaa807074",
    ];
    const ids1 = [
      "68417c59a6d3481c9686d277",
      "68417c47a6d3481c9686d202",
      "68417c79a6d3481c9686d2e8",
      "68417c14a6d3481c9686d118",
      "68417c31a6d3481c9686d191",
      "68417c00a6d3481c9686d0a3",
    ];
    const ids2 = [
      "68418293a6d3481c9686e27a",
      "684182a0a6d3481c9686e2e3",
      "684182b2a6d3481c9686e34c",
      "684182bfa6d3481c9686e41b",
      "684182cda6d3481c9686e54e",
      "684182dda6d3481c9686e5b7",
    ];
    const ids3 = [
      "684184c1a6d3481c9686f61f",
      "684184cca6d3481c9686f688",
      "684184dda6d3481c9686f6dd",
      "684184eaa6d3481c9686f746",
      "684184f6a6d3481c9686f7af",
      "68418504a6d3481c9686f818",
    ];
    const ids4 = [
      "684185f9a6d3481c96870d03",
      "68418604a6d3481c96870d6c",
      "68418611a6d3481c96870e77",
      "68418625a6d3481c96870f46",
      "68418631a6d3481c96871079",
      "68418643a6d3481c96871148",
    ];
    const ids5 = [
      "68418711a6d3481c96871d46",
      "68418722a6d3481c96871e15",
      "68418733a6d3481c96871f20",
      "68418743a6d3481c96871fef",
      "68418750a6d3481c96872122",
      "68418763a6d3481c968721f1",
    ];
    // Tạo danh sách 7 ngày liên tiếp bắt đầu từ hôm nay
    const daysISO = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      // Cộng thêm 1 giờ = 60 phút = 3600 giây = 3600 * 1000 ms
      day.setTime(day.getTime() + 1 * 60 * 60 * 1000);
      daysISO.push(day.toISOString());
    }
    updateShowTimeEveryday(idsDisable, today.toISOString());
    updateShowTimeEveryday(ids, daysISO[0]);
    updateShowTimeEveryday(ids1, daysISO[1]);
    updateShowTimeEveryday(ids2, daysISO[2]);
    updateShowTimeEveryday(ids3, daysISO[3]);
    updateShowTimeEveryday(ids4, daysISO[4]);
    updateShowTimeEveryday(ids5, daysISO[5]);

    const intervalId = setInterval(() => {
      const daysISO = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        // Cộng thêm 1 giờ = 60 phút = 3600 giây = 3600 * 1000 ms
        day.setTime(day.getTime() + 1 * 60 * 60 * 1000);
        daysISO.push(day.toISOString());
      }

      updateShowTimeEveryday(idsDisable, today.toISOString());
      updateShowTimeEveryday(ids, daysISO[0]);
      updateShowTimeEveryday(ids1, daysISO[1]);
      updateShowTimeEveryday(ids2, daysISO[2]);
      updateShowTimeEveryday(ids3, daysISO[3]);
      updateShowTimeEveryday(ids4, daysISO[4]);
      updateShowTimeEveryday(ids5, daysISO[5]);
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [updateShowTimeEveryday]);
}

export default useHandleUpdateShowTimeEveryDay;
