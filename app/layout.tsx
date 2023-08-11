import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";

import "./globals.css";
import type { Metadata } from "next";

// import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

// const inter = Inter({ subsets: ["latin"] });
const font = Nunito({
  subsets: ["latin"],
});
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Klon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20">{children}</div>
      </body>
    </html>
  );
}
