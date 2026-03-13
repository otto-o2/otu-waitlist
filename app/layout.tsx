import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "otu — your plants finally have a voice",
  description:
    "otu identifies your plants, builds full care reports, and gives you on-the-go botanical intelligence. join the waitlist.",
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
        {/* Fonts loaded here instead of @import inside page.tsx <style> tag
            — prevents FOUT and avoids SSR/build issues with inline @import */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
