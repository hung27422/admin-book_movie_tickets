import { Dayjs } from "dayjs";
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  startDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  endDate: Dayjs | null;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  // Bạn có thể thêm nhiều biến khác ở đây trong tương lai
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const appContextValue = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
