import "@/styles/globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
