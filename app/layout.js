import "./globals.css";

export const metadata = {
  title: "Picmal - Effortless image conversion for Mac",
  description:
    "Fast, secure, and lightweight image conversion app for macOS. Convert between 20+ formats locally with no cloud uploads. Perfect for photographers and designers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased smooth-scroll">{children}</body>
    </html>
  );
}
