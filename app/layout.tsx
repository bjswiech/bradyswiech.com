// app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
