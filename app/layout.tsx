import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bailout — One bill closer to breathing room",
  description:
    "A transparent way to turn verified bills into real relief. Find support, fund a bill, and see the impact.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}