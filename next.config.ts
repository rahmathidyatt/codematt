import type { NextConfig } from "next";
const config: NextConfig = {
  distDir:
    process.env.CODEMATT_GALLERY_TEST === "1" ? ".next-gallery" : ".next",
  poweredByHeader: false,
  reactStrictMode: true,
};
export default config;
