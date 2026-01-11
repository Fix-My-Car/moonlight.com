import type { Metadata } from "next";
import "./globals.css"; // Simple and safe!

export const metadata: Metadata = {
  title: "Moonlight Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}