import type { Metadata } from "next";
// FIX: Point to the globals.css inside the (shop) folder
import "../(shop)/globals.css"; 

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