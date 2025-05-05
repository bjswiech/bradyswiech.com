'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-content">
      <h1 className="title">Welcome to My Personal Website</h1>

      <section className="section about-me">
      <img
        src="/profile.jpg"
        alt="Profile Picture"
        style={{
          maxWidth: '200px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid #2c3e50', // Added border
        }}
      />

        <div className="content">
          <h2>About Me</h2>
          <p>
            I'm a junior computer science student at Calvin University who loves building creative tech solutions and competing in collegiate disc golf tournaments. Faith, community, and innovation drive everything I do.
          </p>
          <Link href="/about" className="button">View About</Link>
        </div>
      </section>

      <section className="section">
        <div className="collage">
          <img src="/sprout-logo.png" alt="Sprout Logo" className="collage-image" />
          <img src="/vigil-logo.png" alt="Vigil Logo" className="collage-image" />
        </div>
        <div className="content">
          <h2>Portfolio</h2>
          <p>
            Take a look at some of the software projects I’ve built—from a mobile workout timer app to an investment simulator. I enjoy blending technical skill with practical utility.
          </p>
          <Link href="/portfolio" className="button">View Portfolio</Link>
        </div>
      </section>

      <section className="section">
        <img src="/disc-golf.jpg" alt="Disc Golf" />
        <div className="content">
          <h2>Disc Golf</h2>
          <p>
            I compete at the collegiate level and love the blend of strategy, athleticism, and community in disc golf. Check out my bag, ratings, and socials!
          </p>
          <Link href="/disc-golf" className="button">Explore Disc Golf</Link>
        </div>
      </section>

      <section className="section">
        <img src="/faith.png" alt="Faith" />
        <div className="content">
          <h2>Faith</h2>
          <p>
            My faith in Christ is at the center of my life. Learn more about how I’ve grown spiritually and how that shapes who I am.
          </p>
          <Link href="/faith" className="button">Read My Testimony</Link>
        </div>
      </section>
    </main>
  );
}