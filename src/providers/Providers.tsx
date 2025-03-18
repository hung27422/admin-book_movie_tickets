"use client";

import dynamic from "next/dynamic";
import { AuthContextProvider } from "../contexts/AuthContextProvider/AuthContextProvider";
import { SWRConfig } from "swr";
import api from "../utils/api";

const SnackbarProvider = dynamic(() => import("notistack").then((mod) => mod.SnackbarProvider), {
  ssr: false,
});
const fetcher = (url: string) => api.get(url).then((res) => res.data);
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SWRConfig
        value={{
          fetcher,
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false,
        }}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
      </SWRConfig>
    </SnackbarProvider>
  );
}
