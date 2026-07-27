import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App Router Project",
  description: "Complete challenges to build your Next.js skills",

  openGraph: {
    title: "Next.js App Router Project",
    description: "Complete challenges to build your Next.js skills",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body className={inter.className}>
    <StoreProvider>
      {children}
    </StoreProvider>
  </body>
</html>
  );
}