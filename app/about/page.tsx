// pages/about.tsx
'use client';

export default function About() {
  return (
    <main className="about-page">
      <h1 className="title">About Me</h1>

      {/* Personal Background */}
      <section className="about-section">
        <h2 className="section-title">Who I Am</h2>
        <p>
          Hi! I’m Brady Swiech — a junior Computer Science major at Calvin University, based in Jenison, Michigan. I’m passionate about full-stack development, artificial intelligence, and using software to make a positive impact.
        </p>
      </section>

      {/* Education */}
      <section className="about-section">
        <h2 className="section-title">Education</h2>
        <h3>Calvin University</h3>
        <p>
          I’m currently pursuing a B.S. in Computer Science at Calvin University (Class of 2026), where I’ve enjoyed applying my creativity and leadership in and out of the classroom. I’ve juggled have enjoyed diving into challenging topics like machine learning, database systems, and mobile app development.
        </p>
        <p className="mt-4">
          At Calvin, I’m a founding member of the <strong>Disc Golf Club</strong>, where I helped establish the team, organize events, and compete in collegiate tournaments across the country. I also actively participate in <strong>intramural sports</strong> such as volleyball, soccer, and basketball, which allow me to stay active, build friendships, and lead through collaboration and sportsmanship.
        </p>
        <h3>Jenison High School</h3>
        <p className="mt-4">
          During my time at <strong>Jenison High School</strong>, I graduated with a 4.17 GPA and was deeply involved in extracurriculars. I was a <strong>4-year varsity tennis player</strong>, which helped shape my discipline and competitive spirit. I also was a founding member of the <strong>Chess Club</strong>, helping to create a welcoming space for students to learn and compete in strategic thinking. These experiences taught me resilience, leadership, and how to bring people together around shared passions.
        </p>
      </section>

      {/* Involvement & Interests */}
      <section className="about-section">
        <h2 className="section-title">Involvement & Interests</h2>
        <p>
          Outside of academics, I’m a competitive disc golfer who travels for collegiate events and enjoys playing casually with friends. I’m also into fitness, strategy games, and building community. Whether I’m designing a mobile app or helping start a new club, I enjoy bringing energy, ideas, and dedication to everything I do.
        </p>
      </section>

      {/* Contact Info */}
      <section className="about-section">
        <h2 className="section-title">Get in Touch</h2>
        <p>
          Feel free to connect with me on <a href="https://linkedin.com/in/brady-swiech-1a8a59239" className="link">LinkedIn</a> or check out my work on <a href="https://github.com/bjswiech" className="link">GitHub</a>. You can also reach me directly at <a href="mailto:bjswiech.bs@gmail.com" className="link">bjswiech.bs@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}