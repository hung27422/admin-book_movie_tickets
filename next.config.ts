import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.moveek.com", "www.imdb.com", "www.cgv.vn"], // ✅ Thêm domain của ảnh
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Chấp nhận tất cả domain
      },
    ],
  },
};

export default nextConfig;
