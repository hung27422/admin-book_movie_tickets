"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  if (pathName === "/login") {
    return <>{children}</>;
  }
  console.log(pathName);

  return (
    <div className="bg-white grid grid-cols-12 gap-2">
      <div className="col-span-2 bg-white h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 bg-[var(--bg-page)] py-2 px-10">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
