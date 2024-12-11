import "./globals.css";
import { poppins } from "./ui/font";


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
