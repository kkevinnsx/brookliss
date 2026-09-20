import "./globals.css";

export const metadata = {
  title: "Brookliss Profissional",
  description:
    "Ciência que transforma. Beleza que permanece. Cuidado capilar profissional, vegano e livre de crueldade.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
