import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "otu — your plants finally have a voice",
  description:
    "otu identifies your plants, builds full care reports, and gives you on-the-go botanical intelligence. join the waitlist.",
  keywords: ["plant identification", "plant care", "botanical", "garden", "otu"],
  openGraph: {
    title: "otu — your plants finally have a voice",
    description:
      "identify any plant. receive full care reports. know what's growing everywhere you go.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for faster font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fonts — DM Serif Display for headings, Inter for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon - leaf emoji as SVG */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
