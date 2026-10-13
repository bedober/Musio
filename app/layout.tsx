import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Musio — Music without borders",
  description: "Discover music, support artists, and grow your sound with Musio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
