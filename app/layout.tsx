import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "haus der grünen",
  description: "haus der grünen — a place where everything grows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Cormorant Garamond for elegant serif, Outfit for the bold display look */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 68'%3E%3Crect x='33' y='38' width='6' height='22' rx='3' fill='%238B5E3C' /%3E%3Cellipse cx='36' cy='30' rx='22' ry='20' fill='%234A7A28' /%3E%3Cellipse cx='36' cy='27' rx='16' ry='14' fill='%235EA030' /%3E%3Cellipse cx='28' cy='24' rx='8' ry='7' fill='%2372B840' opacity='0.7' /%3E%3Cellipse cx='44' cy='26' rx='7' ry='6' fill='%2372B840' opacity='0.55' /%3E%3Cellipse cx='36' cy='18' rx='6' ry='5' fill='%2388CC48' opacity='0.6' /%3E%3C/svg%3E"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
