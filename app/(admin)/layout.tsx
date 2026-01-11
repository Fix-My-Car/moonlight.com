import type { Metadata } from "next";
// FIX: Use '@' to point securely to the file from the root
import "@/app/(shop)/globals.css"; 

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