"use client";
import dynamic from "next/dynamic";
import { AuthContextProvider } from "../contexts/AuthContextProvider/AuthContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SWRConfig } from "swr";
import api from "../utils/api";
import { AppContextProvider } from "@/contexts/AppContextProvider/AppContextProvider";
import useHandleUpdateShowTimeEveryDay from "@/components/hooks/useHandleUpdateShowTimeEveryDay";

const SnackbarProvider = dynamic(() => import("notistack").then((mod) => mod.SnackbarProvider), {
  ssr: false,
});
const fetcher = (url: string) => api.get(url).then((res) => res.data);
export function Providers({ children }: { children: React.ReactNode }) {
  useHandleUpdateShowTimeEveryDay();
  return (
    <SnackbarProvider maxSnack={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SWRConfig
          value={{
            fetcher,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
          }}
        >
          <AppContextProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </AppContextProvider>
        </SWRConfig>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}
