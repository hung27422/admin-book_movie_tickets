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
    const idsHCM = [
      "684016bd5dac6becaa80414a",
      "68401a125dac6becaa805e64",
      "684019ac5dac6becaa804c35",
      "68401ac85dac6becaa806710",
      "68401aa55dac6becaa806640",
      "68401af45dac6becaa807074",
    ];
    const idsHCM1 = [
      "68417c59a6d3481c9686d277",
      "68417c47a6d3481c9686d202",
      "68417c79a6d3481c9686d2e8",
      "68417c14a6d3481c9686d118",
      "68417c31a6d3481c9686d191",
      "68417c00a6d3481c9686d0a3",
    ];
    const idsHCM2 = [
      "68418293a6d3481c9686e27a",
      "684182a0a6d3481c9686e2e3",
      "684182b2a6d3481c9686e34c",
      "684182bfa6d3481c9686e41b",
      "684182cda6d3481c9686e54e",
      "684182dda6d3481c9686e5b7",
    ];
    const idsHCM3 = [
      "684184c1a6d3481c9686f61f",
      "684184cca6d3481c9686f688",
      "684184dda6d3481c9686f6dd",
      "684184eaa6d3481c9686f746",
      "684184f6a6d3481c9686f7af",
      "68418504a6d3481c9686f818",
    ];
    const idsHCM4 = [
      "684185f9a6d3481c96870d03",
      "68418604a6d3481c96870d6c",
      "68418611a6d3481c96870e77",
      "68418625a6d3481c96870f46",
      "68418631a6d3481c96871079",
      "68418643a6d3481c96871148",
    ];
    const idsHCM5 = [
      "68418711a6d3481c96871d46",
      "68418722a6d3481c96871e15",
      "68418733a6d3481c96871f20",
      "68418743a6d3481c96871fef",
      "68418750a6d3481c96872122",
      "68418763a6d3481c968721f1",
    ];
    const idsDN = ["68418912a6d3481c96876c70", "6841cbd6a6d3481c9687e111"];
    const idsDN1 = ["6841db6da6d3481c96881376", "6841db7aa6d3481c968813df"];
    const idsDN2 = ["6841dd80a6d3481c96882426", "6841dd8ca6d3481c9688248f"];
    const idsDN3 = ["6841de2ba6d3481c9688347f", "6841de3fa6d3481c968834e8"];
    const idsDN4 = ["6841dee4a6d3481c968844b2", "6841df04a6d3481c9688451b"];
    const idsDN5 = ["6841dfaea6d3481c968854bf", "6841dfc6a6d3481c96885528"];
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
    updateShowTimeEveryday(idsHCM, daysISO[0]);
    updateShowTimeEveryday(idsHCM1, daysISO[1]);
    updateShowTimeEveryday(idsHCM2, daysISO[2]);
    updateShowTimeEveryday(idsHCM3, daysISO[3]);
    updateShowTimeEveryday(idsHCM4, daysISO[4]);
    updateShowTimeEveryday(idsHCM5, daysISO[5]);

    updateShowTimeEveryday(idsDN, daysISO[0]);
    updateShowTimeEveryday(idsDN1, daysISO[1]);
    updateShowTimeEveryday(idsDN2, daysISO[2]);
    updateShowTimeEveryday(idsDN3, daysISO[3]);
    updateShowTimeEveryday(idsDN4, daysISO[4]);
    updateShowTimeEveryday(idsDN5, daysISO[5]);

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
      updateShowTimeEveryday(idsHCM, daysISO[0]);
      updateShowTimeEveryday(idsHCM1, daysISO[1]);
      updateShowTimeEveryday(idsHCM2, daysISO[2]);
      updateShowTimeEveryday(idsHCM3, daysISO[3]);
      updateShowTimeEveryday(idsHCM4, daysISO[4]);
      updateShowTimeEveryday(idsHCM5, daysISO[5]);
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [updateShowTimeEveryday]);
}

export default useHandleUpdateShowTimeEveryDay;
