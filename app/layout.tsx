import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Nunito, Rubik, Poppins } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Task Codex",
  description: "Gamified productivity for real-life tasks.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${poppins.variable} ${nunito.variable}`}
    >
      <body className="min-h-screen bg-gray-200">
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
