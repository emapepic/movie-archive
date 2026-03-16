import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My movie archive",
  description: "Your own archive for documenting watched movies and TV series",
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
