'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function DiscGolfPage() {
  return (
    <div className="disc-golf-page space-y-8"> {/* space between sections */}
      <h1 className="text-3xl font-bold disc-golf-title">Disc Golf</h1>

      <section>
        <p><strong>PDGA Number:</strong> <a href="https://www.pdga.com/player/207735" target="_blank" rel="noopener noreferrer">207735</a></p>
        <p><strong>PDGA Rating:</strong> 918</p> {/* Update as needed */}
      </section>

      {/* Why I Love Disc Golf Section */}
      <section className="why-i-love-disc-golf space-y-4">
        <h2 className="text-2xl font-semibold">Why I Love Disc Golf</h2>
        <p>
          Disc golf is not just a game, it's a passion. I love the combination of skill, strategy, and nature. 
          Every round offers a new challenge, whether it's mastering a tricky hole or simply enjoying a day outdoors. 
          It allows me to constantly improve and push my limits while connecting with friends and the disc golf community.
        </p>
      </section>

      {/* Discs in My Bag Section */}
      <section className="discs-in-my-bag space-y-4">
        <h2 className="text-2xl font-semibold">Discs in My Bag</h2>
        <p>
          My disc golf bag is filled with a variety of discs, each serving a specific purpose to help me navigate any course. 
          I carry a mix of putters, midranges, fairway drivers, and distance drivers to ensure I have the right tool for every shot.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Putters:</strong> Mint Discs UFO (favorite for putting), Innova Nova (3), Innova AviarX3</li>
          <li><strong>Midranges:</strong> Innova Rollo, Legacy Recluse, Discmania Origin, Latitude 64 Compass, Innova RocX3</li>
          <li><strong>Fairway Drivers:</strong> Mint Discs Jackalope, Mint Discs Alpha, Innova Teebird, Prodigy F1</li>
          <li><strong>Distance Drivers:</strong>  MVP Timelapse, Innova Boss, Wild Discs Great White, Innova Destroyer, Discraft Vulture (2)</li>
        </ul>
      </section>

      <section className="social-links space-y-4">
        <h2 className="text-2xl font-semibold">Follow My Game</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com/bswizler.discgolf" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.tiktok.com/@bswizler.discgolf" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} size="2x" />
          </a>
        </div>
      </section>
    </div>
  );
}
