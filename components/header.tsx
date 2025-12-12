'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'portfolio', 'disc-golf', 'faith', 'contact'];
      const scrollPosition = window.scrollY + 150;

      // Check if we're at the very top of the page
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

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

    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <>
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <button className="nav-logo" onClick={() => scrollToSection('home')}>
            <span className="logo-text">Brady Swiech</span>
          </button>
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
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
            <a 
              href="mailto:bjswiech.bs@gmail.com" 
              className="nav-link nav-link-email mobile-only"
              onClick={() => setMobileMenuOpen(false)}
            >
              Email Me
            </a>
          </div>
          <div className="nav-right">
            <div className="nav-divider"></div>
            <a href="mailto:bjswiech.bs@gmail.com" className="nav-cta">
              Email Me
            </a>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>
      </header>
    </>
  );
}
