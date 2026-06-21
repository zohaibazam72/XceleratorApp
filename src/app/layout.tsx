import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

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
      <body className="min-h-screen w-full bg-canvas">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
