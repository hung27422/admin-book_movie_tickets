import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.moveek.com", "www.imdb.com"], // ✅ Thêm domain của ảnh
  },
};

export default nextConfig;
