import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Nunito, Rubik, Poppins } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});

const rubik = Rubik({
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
});

export const metadata = {
  title: "Task Codex",
  description: "Gamified productivity for real-life tasks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="bg-gray-200 m-4 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
