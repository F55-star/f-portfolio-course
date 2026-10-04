import "./globals.css";
import profile from "@/data/profile.json";

export const metadata = {
  title: `${profile.studentId}${profile.name}的第一个网页`,
  description: "F / 范逸风 — 数字媒体技术 · 场景建模与地编个人展示。",
};
export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}

