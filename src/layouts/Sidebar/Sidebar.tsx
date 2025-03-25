"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/img/Logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { usePathname } from "next/navigation";
const menus = [
  {
    id: "1",
    title: "Dashboard",
    icon: <DashboardIcon />,
    href: "/",
  },
  {
    id: "2",
    title: "Phim",
    icon: <MovieIcon />,
    href: "/movies",
  },
  {
    id: "3",
    title: "Rạp",
    icon: <LocationOnIcon />,
    href: "/cinemas",
  },
];
function Sidebar() {
  const path = usePathname();

  return (
    <div className="py-2 px-4">
      <div className="flex justify-center mt-2 w-full">
        <Link href={"/"}>
          <Image
            className="px-4 py-1"
            src={Logo}
            alt="Logo"
            width={160}
            height={60}
            sizes="(max-width: 768px) 100px, auto"
          />
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-lg text-gray-400">Quản Lý</h3>
        <div className="mt-2">
          {menus.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={`flex items-center py-2 px-6 text-xl text-gray-800 rounded-md tracking-wide my-2 ${
                path === menu.href ? "bg-[#F2C2C2]" : "bg-[#dde8ea]"
              }`}
            >
              <div className={`${path === menu.href ? "text-[#eb7575]" : "bg-[#dde8ea]"}`}>
                {menu.icon}
              </div>
              <div className="ml-2">{menu.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
