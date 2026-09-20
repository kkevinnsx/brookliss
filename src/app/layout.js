import "./globals.css";

export const metadata = {
  title: "brookliss",
  description:
    "Cosméticos profissionais desenvolvidos com ciência, tecnologia e performance para cuidados capilares.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}