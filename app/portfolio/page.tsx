'use client';
import { useState } from 'react';
import ProjectCard from '../../components/project-card';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof technologies>('Frontend');

  const technologies = {
    Frontend: ['React', 'React Native', 'Next.js', 'Expo', 'HTML', 'CSS'],
    Backend: ['Node.js', 'PostgreSQL', 'Firebase'],
    Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'],
    Tools: ['Git & GitHub', 'VS Code', 'Figma', 'Vercel', 'ESLint', 'npm'],
  };

  return (
    <main className="page-content">
      <h1 className="title">Portfolio</h1>

      <section className="tech-section">
        <h2>Technologies I Use</h2>
        <div className="category-buttons">
          {Object.keys(technologies).map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category as keyof typeof technologies)}
            >
              {category}
            </button>
          ))}
        </div>
        <ul className="tech-list">
          {technologies[selectedCategory].map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>

      <ProjectCard
        title="Vigil"
        description="A mobile app that helps users create and manage workouts with optimized rest timing."
        link="https://github.com/calvin-cs262-fall2024-no-pain-no-main/no-pain-no-main-client"
        techStack={['React Native', 'Expo', 'TypeScript', 'PostgreSQL']}
      />
      <ProjectCard
        title="Sprout"
        description="A web app that uses real stock market data to teach investment strategies using simulated money."
        link="https://github.com/calvin-cs336-finalproject/sprout-client"
        techStack={['React', 'Node.js', 'Firebase', 'TypeScript']}
      />
    </main>
  );
}
