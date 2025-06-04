"use client";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider/AuthContextProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { authState } = useContext(AuthContext);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/login"); // Chỉ chạy một lần
    } else {
      router.push("/");
    }
  }, [authState.isAuthenticated, router]);

  if (pathName === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="bg-white grid grid-cols-12 gap-2">
      <div className="col-span-2 bg-white h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 bg-[var(--bg-page)] py-2 px-10 ">
        <Navbar />
        <div className="mt-8 p-2  rounded-md">{children}</div>
      </div>
    </div>
  );
}
