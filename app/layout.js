import "./globals.css";

export const metadata = {
  title: "Picmal - Privacy-First Image Converter for Mac",
  description: "Fast, secure, and lightweight image conversion app for macOS. Convert between 20+ formats locally with no cloud uploads. Perfect for photographers and designers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
