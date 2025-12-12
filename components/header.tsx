'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'portfolio', 'disc-golf', 'faith', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">Brady Swiech</span>
        </button>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}
            onClick={() => scrollToSection('portfolio')}
          >
            Projects
          </button>
          <button 
            className={`nav-link ${activeSection === 'disc-golf' ? 'active' : ''}`}
            onClick={() => scrollToSection('disc-golf')}
          >
            Disc Golf
          </button>
          <button 
            className={`nav-link ${activeSection === 'faith' ? 'active' : ''}`}
            onClick={() => scrollToSection('faith')}
          >
            Faith
          </button>
          <button 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>
        <div className="nav-right">
          <div className="nav-divider"></div>
          <a href="mailto:bjswiech.bs@gmail.com" className="nav-cta">
            Email Me
          </a>
        </div>
      </nav>
    </header>
  );
}
