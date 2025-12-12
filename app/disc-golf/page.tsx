'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function DiscGolfPage() {
  return (
    <main className="disc-golf-page">
      <h1 className="disc-golf-title">Disc Golf</h1>

      <section>
        <p>
          <strong>PDGA Number:</strong>{' '}
          <a href="https://www.pdga.com/player/207735" target="_blank" rel="noopener noreferrer">
            207735
          </a>
        </p>
        <p><strong>PDGA Rating:</strong> 918</p>
      </section>

      <section className="why-i-love-disc-golf">
        <h2>Why I Love Disc Golf</h2>
        <p>
          Disc golf is more than just a game — it&apos;s a passion that combines skill, 
          strategy, and nature. Every round offers a new challenge, whether it&apos;s 
          mastering a tricky hole or enjoying a beautiful day outdoors. The sport 
          constantly pushes me to improve while connecting me with an incredible community.
        </p>
      </section>

      <section className="discs-in-my-bag">
        <h2>Discs in My Bag</h2>
        <p>Here&apos;s what I carry:</p>
        <ul>
          <li>
            <strong>Putters:</strong> Gateway Wizard (x2), Innova Nova (×2), Gateway Warspear (x3)
          </li>
          <li>
            <strong>Midranges:</strong> Innova Mako3 (x2), Gateway Warrior, Gateway Mystic
          </li>
          <li>
            <strong>Fairway Drivers:</strong> Disctroyer Stork,  Gateway Sabre, 
            Innova Teebird (x3)
          </li>
          <li>
            <strong>Distance Drivers:</strong> Innova Boss (x4), Gateway Aura, Wild Discs Great White
            , Innova Firebird (x2)
          </li>
        </ul>
      </section>

      <section className="social-links">
        <h2>Follow My Game</h2>
        <div className="social-icons">
          <a 
            href="https://www.instagram.com/bswizler.discgolf" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a 
            href="https://www.tiktok.com/@bswizler.discgolf" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </a>
        </div>
      </section>
    </main>
  );
}
