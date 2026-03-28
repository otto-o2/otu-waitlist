import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plants, Solved. otu.",
  description: "identifies your plants, builds care reports, and lets you buy plants, plant stuff, and plant people. join the waitlist at meetotu.com.",
  keywords: ["otu", "otu plants", "otu plant intelligence", "meet otu", "plant identifier", "plant care app"],
  metadataBase: new URL("https://meetotu.com"),
  openGraph: {
    title: "Plants, Solved. otu.",
    description: "identifies your plants, builds care reports, and lets you buy plants, plant stuff, and plant people. join the waitlist at meetotu.com.",
    url: "https://meetotu.com",
    siteName: "otu",
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Plants, Solved. otu.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plants, Solved. otu.",
    description: "identifies your plants, builds care reports, and lets you buy plants, plant stuff, and plant people. join the waitlist at meetotu.com.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "r27c0YD0o3rcuJvjFbK9k9TXriAEoVzLpIMP7yyIG3Q",
  },
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
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
