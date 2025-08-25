import "./globals.css";

export const metadata = {
  title: "Picmal - Effortless image conversion for Mac",
  description:
    "Privacy-first image converter that makes converting images quickly and easily while keeping them secure.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased smooth-scroll">{children}</body>
    </html>
  );
}
