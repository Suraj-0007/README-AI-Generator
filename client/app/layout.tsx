import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "AI README Generator",
  description: "Generate, edit, and download README.md files using AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
