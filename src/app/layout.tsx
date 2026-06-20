import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xcelerator",
  description: "GCSE Maths revision — master the patterns that move your grade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
