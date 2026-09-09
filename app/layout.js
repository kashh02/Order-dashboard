import "./globals.css";

export const metadata = {
  title: "Orders Dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
