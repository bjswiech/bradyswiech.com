'use client';

export default function About() {
  return (
    <main className="about-page">
      <h1 className="title">About Me</h1>

      <section className="about-section">
        <h2 className="section-title">Who I Am</h2>
        <p>
          Hi! I&apos;m Brady Swiech — a junior Computer Science major at Calvin University, 
          based in Jenison, Michigan. I&apos;m passionate about full-stack development, 
          artificial intelligence, and using software to make a positive impact.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Education</h2>
        
        <h3>Calvin University</h3>
        <p>
          I&apos;m currently pursuing a B.S. in Computer Science at Calvin University 
          (Class of 2026), where I&apos;ve enjoyed applying my creativity and leadership 
          in and out of the classroom. I&apos;ve loved diving into challenging topics like 
          machine learning, database systems, and mobile app development.
        </p>
        <p>
          At Calvin, I&apos;m a founding member of the <strong>Disc Golf Club</strong>, 
          where I helped establish the team, organize events, and compete in collegiate 
          tournaments across the country. I also actively participate in 
          <strong> intramural sports</strong> such as volleyball, soccer, and basketball.
        </p>
        
        <h3>Jenison High School</h3>
        <p>
          During my time at <strong>Jenison High School</strong>, I graduated with a 4.17 GPA 
          and was deeply involved in extracurriculars. I was a <strong>4-year varsity tennis 
          player</strong>, which helped shape my discipline and competitive spirit. I also 
          was a founding member of the <strong>Chess Club</strong>.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Involvement &amp; Interests</h2>
        <p>
          Outside of academics, I&apos;m a competitive disc golfer who travels for 
          collegiate events and enjoys playing casually with friends. I&apos;m also into 
          fitness, strategy games, and building community.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Get in Touch</h2>
        <p>
          Connect with me on{' '}
          <a href="https://linkedin.com/in/brady-swiech-1a8a59239" className="link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          or check out my work on{' '}
          <a href="https://github.com/bjswiech" className="link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>. 
          You can also reach me at{' '}
          <a href="mailto:bjswiech.bs@gmail.com" className="link">
            bjswiech.bs@gmail.com
          </a>.
        </p>
      </section>
    </main>
  );
}
