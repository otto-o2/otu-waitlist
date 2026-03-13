import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "otu — your plants finally have a voice",
  description: "otu identifies your plants, builds full care reports, and gives you on-the-go botanical intelligence. join the waitlist.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
