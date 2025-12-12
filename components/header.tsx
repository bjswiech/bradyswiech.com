// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-item">
          <Link href="/">Home</Link>
        </div>
        <div className="nav-item">
          <Link href="/portfolio">Portfolio</Link>
        </div>
        <div className="nav-item">
          <Link href="/disc-golf">Disc Golf</Link>
        </div>
        <div className="nav-item">
          <Link href="/faith">Faith</Link>
        </div>
        <div className="nav-item">
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}