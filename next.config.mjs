import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root },
  outputFileTracingRoot: root,
  devIndicators: false,
};

