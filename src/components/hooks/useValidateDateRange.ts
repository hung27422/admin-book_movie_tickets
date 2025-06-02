// hooks/useValidateDateRange.ts
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

export default function useValidateDateRange(
  startDate: dayjs.Dayjs | null,
  endDate: dayjs.Dayjs | null,
  onInvalid: () => void
) {
  const hasShown = useRef(false);

  useEffect(() => {
    if (startDate && endDate) {
      if (endDate.isBefore(startDate)) {
        if (!hasShown.current) {
          onInvalid();
          hasShown.current = true;
        }
      } else {
        hasShown.current = false;
      }
    }
  }, [startDate, endDate, onInvalid]);
}
