// app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: 'Brady Swiech',
  description: 'Personal website of Brady Swiech - Computer Science student at Calvin University, competitive disc golfer, and faith-driven developer.',
  icons: {
    icon: '/favicon.svg',
    apple: '/profile_pic.jpg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/profile_pic.jpg" />
        <meta name="theme-color" content="#22c55e" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
