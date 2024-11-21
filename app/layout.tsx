import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashbord",
  description: "Create and manage your tasks with Dashboard",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main role="main">{children}</main>
      </body>
    </html>
  );
}
