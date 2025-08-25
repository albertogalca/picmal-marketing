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
  openGraph: {
    title: "Picmal - Effortless image conversion for Mac",
    description: "Privacy-first image converter that makes converting images quickly and easily while keeping them secure.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Picmal - Effortless image conversion for Mac",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Picmal - Effortless image conversion for Mac",
    description: "Privacy-first image converter that makes converting images quickly and easily while keeping them secure.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <script defer data-domain="picmal.app" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="antialiased smooth-scroll">{children}</body>
    </html>
  );
}
