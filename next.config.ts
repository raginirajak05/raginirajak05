import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: { unoptimized: true },
  // Set basePath to your GitHub repo name if deploying as a project page.
  // e.g. basePath: "/raginirajak"
  // Leave empty if deploying to <username>.github.io root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
