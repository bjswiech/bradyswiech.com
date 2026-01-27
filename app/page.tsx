'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectCard from '../components/project-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const technologies = {
  Frontend: ['React', 'React Native', 'Next.js', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'PostgreSQL', 'Firebase', 'SQLite'],
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'],
  Tools: ['Git & GitHub', 'Figma', 'VS Code'],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof technologies>('Frontend');
  const [pdgaRating, setPdgaRating] = useState<string>('929');
  const [ratingChange, setRatingChange] = useState<number | null>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch PDGA rating
    fetch('/api/pdga-rating')
      .then(res => res.json())
      .then(data => {
        if (data.rating) {
          const currentRating = parseInt(data.rating);
          setPdgaRating(data.rating);
          
          // Use previous rating from API (from PDGA's last update)
          if (data.previousRating) {
            const previousRating = parseInt(data.previousRating);
            const change = currentRating - previousRating;
            setRatingChange(change);
          }
        }
      })
      .catch(err => {
        console.error('Failed to fetch PDGA rating:', err);
        // Keep default rating if fetch fails
      });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
              // Animate skills list when skills section is visible
              const skillsList = entry.target.querySelector('.skills-list');
              if (skillsList) {
                skillsList.classList.add('visible');
              }
            }, index * 100);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = sectionsRef.current?.querySelectorAll('.animate-section');
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionsRef} className="main-wrapper">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <p className="hero-greeting">Hello, my name is</p>
            <h1 className="hero-name">Brady Swiech</h1>
            <p className="hero-tagline">I&apos;m a developer, disc golfer,<br />and student.</p>
            <a href="#contact" className="hero-button">Get in Touch</a>
          </div>
          <div className="hero-divider"></div>
          <div className="hero-right">
            <div className="hero-image-container">
              <Image
        src="/profile.jpg"
                alt="Brady Swiech"
                width={500}
                height={500}
                className="hero-image"
                priority
              />
            </div>
          </div>
        </div>
        <div className="hero-social">
          <a href="https://github.com/bjswiech" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/brady-swiech-1a8a59239" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I am a senior Computer Science student at Calvin University, passionate about 
                building software solutions and competing in collegiate disc golf.
              </p>
              <p>
                I study Computer Science at Calvin University, combining technical skills with 
                creativity and innovation. I have a passion for creating and building systems, 
                whether it be a new software project or solving complex problems. I am always 
                looking to learn and grow, and I am constantly seeking new challenges and opportunities.
              </p>
            </div>
            <div className="about-badges">
              <div className="badge">Developer</div>
              <div className="badge">Student</div>
              <div className="badge">Athlete</div>
              <div className="badge">Creator</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section id="skills" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title">Skills & Tools</h2>
          <div className="skills-content">
            <div className="skills-categories">
              {Object.keys(technologies).map((category) => (
                <button
                  key={category}
                  className={`skill-category ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category as keyof typeof technologies)}
                >
                  {category}
                </button>
              ))}
            </div>
            <ul className="skills-list">
              {technologies[selectedCategory].map((tech) => (
                <li key={tech} className="skill-item">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              title="Vigil - Workout Organizer"
              description="A mobile application workout organizer. Built alongside 5 others, our goal was to blend effective workouts with interactive recovery, ensuring that users maximize their time at the gym. This was created for my Software Engineering course at Calvin University."
              link="https://github.com/calvin-cs262-fall2024-no-pain-no-main/no-pain-no-main-client"
              techStack={['React Native', 'Expo', 'TypeScript', 'PostgreSQL']}
            />
            <ProjectCard
              title="Sprout - Stock Trader"
              description="A webpage designed to display stock data and allow users to buy and sell stocks with fake money. Used a cloud function to update stock data with real time information. This was developed alongside 3 others for my Web Development course at Calvin University."
              link="https://github.com/calvin-cs336-finalproject/sprout-client"
              techStack={['React', 'Node.js', 'Firebase', 'TypeScript']}
            />
          </div>
        </div>
      </section>

      {/* Disc Golf Section */}
      <section id="disc-golf" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title">Disc Golf</h2>
          <div className="disc-content">
            <div className="disc-text">
              <div className="disc-stats">
                <div className="disc-stat">
                  <span className="stat-label">PDGA Number</span>
                  <a href="https://www.pdga.com/player/207735" target="_blank" rel="noopener noreferrer" className="stat-value">
                    207735
                  </a>
                </div>
                <div className="disc-stat">
                  <span className="stat-label">PDGA Rating</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{pdgaRating}</span>
                    {ratingChange !== null && ratingChange !== 0 && (
                      <span className={`rating-change ${ratingChange > 0 ? 'positive' : 'negative'}`}>
                        <span className="rating-arrow">{ratingChange > 0 ? '↑' : '↓'}</span>
                        <span className="rating-change-value">{Math.abs(ratingChange)}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p>
                Disc golf is more than just a game — it&apos;s a passion that combines skill, 
                strategy, and nature. Every round offers a new challenge, whether it&apos;s 
                mastering a tricky hole or enjoying a beautiful day outdoors.
              </p>
              <h3>Discs in My Bag</h3>
              <div className="disc-categories">
                <div className="disc-category-group">
                  <h4 className="disc-category-title">Putters</h4>
                  <ul className="disc-list">
                    <li><a href="https://infinitediscs.com/gateway-wizard" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Wizard</span></a><span className="disc-count">×2</span></li>
                    <li><a href="https://infinitediscs.com/innova-nova" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Innova Nova</span></a><span className="disc-count">×2</span></li>
                    <li><a href="https://infinitediscs.com/gateway-warspear" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Warspear</span></a><span className="disc-count">×3</span></li>
                  </ul>
                </div>
                <div className="disc-category-group">
                  <h4 className="disc-category-title">Midranges</h4>
                  <ul className="disc-list">
                    <li><a href="https://infinitediscs.com/innova-mako3" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Innova Mako3</span></a><span className="disc-count">×2</span></li>
                    <li><a href="https://infinitediscs.com/gateway-warrior" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Warrior</span></a></li>
                    <li><a href="https://infinitediscs.com/gateway-mystic" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Mystic</span></a></li>
                  </ul>
                </div>
                <div className="disc-category-group">
                  <h4 className="disc-category-title">Fairway Drivers</h4>
                  <ul className="disc-list">
                    <li><a href="https://infinitediscs.com/disctroyer-stork" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Disctroyer Stork</span></a></li>
                    <li><a href="https://infinitediscs.com/gateway-sabre" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Sabre</span></a></li>
                    <li><a href="https://infinitediscs.com/innova-teebird" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Innova Teebird</span></a><span className="disc-count">×3</span></li>
                  </ul>
                </div>
                <div className="disc-category-group">
                  <h4 className="disc-category-title">Distance Drivers</h4>
                  <ul className="disc-list">
                    <li><a href="https://infinitediscs.com/innova-boss" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Innova Boss</span></a><span className="disc-count">×4</span></li>
                    <li><a href="https://infinitediscs.com/gateway-aura" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Gateway Aura</span></a></li>
                    <li><a href="https://infinitediscs.com/wild-discs-great-white" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Wild Discs Great White</span></a></li>
                    <li><a href="https://infinitediscs.com/innova-firebird" target="_blank" rel="noopener noreferrer" className="disc-link"><span className="disc-name">Innova Firebird</span></a><span className="disc-count">×2</span></li>
                  </ul>
                </div>
              </div>
              <div className="disc-social">
                <h3>Follow My Game</h3>
                <div className="disc-social-icons">
                  <a href="https://www.instagram.com/bswizler.discgolf" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="https://www.tiktok.com/@bswizler.discgolf" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </div>
              </div>
            </div>
            <div className="disc-image-wrapper">
              <Image 
                src="/disc-golf.jpg" 
                alt="Disc Golf" 
                width={500}
                height={600}
                className="disc-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faith Section */}
      <section id="faith" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title">Faith</h2>
          <div className="faith-content">
            <div className="faith-text">
              <p>
                On <strong>February 12, 2025</strong>, everything changed. After years of 
                battling depression and feeling spiritually distant, I cried out to God with 
                an honest question — should I move on or keep hoping? On that very day, 
                I felt something I hadn&apos;t in years: <strong>peace, freedom, and the 
                absolute presence of God.</strong>
              </p>
              <p>
                It was the first time I had <em>zero doubt</em> that God is real. My depression 
                lifted. My anger and hopelessness vanished. And I knew — not just in my head, 
                but in my heart — that God had heard me.
              </p>
              <blockquote className="scripture">
                <p>
                  I waited patiently for the Lord; and he inclined unto me, and heard my cry.
                </p>
                <p>
                  He brought me up also out of an horrible pit, out of the miry clay, and set 
                  my feet upon a rock, and established my goings.
                </p>
                <p>
                  And he hath put a new song in my mouth, even praise unto our God: many shall 
                  see it, and fear, and shall trust in the Lord.
                </p>
                <cite>— Psalm 40:1-3 KJV</cite>
              </blockquote>
              <p>
                That verse now lives in me. It&apos;s a daily reminder of how deeply God loves, 
                and how faithfully He shows up when we surrender. This is my testimony: 
                <strong> God is real, God is good, and God changed my life.</strong>
              </p>
            </div>
            <div className="faith-image-wrapper">
              <Image 
                src="/faith.png" 
                alt="Faith" 
                width={400}
                height={500}
                className="faith-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section animate-section">
        <div className="section-container">
          <h2 className="section-title contact-title">Contact Me</h2>
          <div className="contact-content">
            <p>
              Interested in working together or just want to say hi? Feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="https://linkedin.com/in/brady-swiech-1a8a59239" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/bjswiech" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
              <a href="mailto:bjswiech.bs@gmail.com" className="contact-link">
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
