// app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Brady Swiech | CS Student & Disc Golfer',
  description: 'Personal website of Brady Swiech - Computer Science student at Calvin University, competitive disc golfer, and faith-driven developer.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
