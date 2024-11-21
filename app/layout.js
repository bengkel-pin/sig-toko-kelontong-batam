import localFont from "next/font/local";
import "./globals.css";
import { poppins } from "./ui/font";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Toko Kelontong Batam",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
