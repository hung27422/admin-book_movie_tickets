import useShowTime from "@/hooks/useShowTimes";
import { useEffect, useRef } from "react";

function useHandleUpdateShowTimeEveryDay() {
  const { updateShowTimeEveryday } = useShowTime();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return; // nếu đã chạy rồi thì không chạy lại
    initialized.current = true;

    const ids = [
      "68246fe23c05c6b067f83a2e",
      "682625bf080e38e20ff21e3a",
      "68358529587112b362411441",
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

    updateShowTimeEveryday(ids, daysISO[0], daysISO[0]);

    const intervalId = setInterval(() => {
      const nowISO = new Date().toISOString();
      updateShowTimeEveryday(ids, nowISO, nowISO);
      console.log("123");
    }, 60000);

    return () => clearInterval(intervalId);
  }, [updateShowTimeEveryday]);
}

export default useHandleUpdateShowTimeEveryDay;
