import React, { useState, useEffect } from 'react';
import './global.scss';
import './App.scss';
import Intro from "./components/jsx_files/intro";
import CustomCursor from './components/jsx_files/CustomCursor';
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import Projects from './components/jsx_files/Projects';
import Education from './components/jsx_files/Education';
import Testimonials from './components/jsx_files/Testimonials';
import Blogs from './components/jsx_files/Blogs';
import Contact from './components/jsx_files/Contact';
import AgenticPlaygroundPage from './components/jsx_files/AgenticPlaygroundPage';
import { 
  FiGithub, 
  FiLinkedin,
  FiMoon,
  FiSun
} from 'react-icons/fi';

import { motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrambleText from './components/jsx_files/ScrambleText';
import CommandPalette from './components/jsx_files/CommandPalette';

function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // URL Path / Hash Router
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (path.includes('playground') || hash.includes('playground')) ? 'playground' : 'home';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setRoute((path.includes('playground') || hash.includes('playground')) ? 'playground' : 'home');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/#experience');
    setRoute('home');
    setTimeout(() => {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (route !== 'home') return;

    const handleScroll = () => {
      const sections = ['intro', 'experience', 'skills', 'projects', 'education', 'testimonials', 'blogs', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= window.innerHeight / 2) {
            setActiveSection(prev => (prev !== section ? section : prev));
            break;
          }
        }
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'testimonials', name: 'Recommendations' }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // If on /playground route, render dedicated AgenticPlaygroundPage
  if (route === 'playground') {
    return (
      <div className="App modern-theme">
        <CustomCursor />
        <CommandPalette />
        <SpeedInsights />
        <AgenticPlaygroundPage onBack={navigateToHome} />
      </div>
    );
  }

  return (
    <div className="App modern-theme">
      <CustomCursor />
      <CommandPalette />
      <SpeedInsights />

      {/* Modern Sticky Navbar */}
      <nav className="modern-navbar">
        <div className="nav-brand" onClick={() => scrollToSection('intro')}>
          {/* Brand removed per request */}
        </div>
        
        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
          
          <button 
            className="cmd-k-hint"
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
              document.dispatchEvent(event);
            }}
          >
            <span>Search</span>
            <span className="kb-shortcut">⌘K</span>
          </button>

          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <a 
            href="https://github.com/Aviroop-001" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
          >
            <FiGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/aviroop-banerjee-0775a621b/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-btn"
          >
            <FiLinkedin />
          </a>
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="resume-btn"
          >
            Résumé
          </a>
        </div>
      </nav>

      {/* Main Scrolling Content */}
      <main className="scrolling-content">
        <section id="intro" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <Intro />
          </motion.div>
        </section>

        <section id="about" className="page-section">
          <motion.div 
            className="section-container about-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="About Me" className="section-title" />
            <p className="about-text">
              Software Engineer specializing in highly scalable distributed backends, LLM-powered multi-agent architectures, and resilient microservices. 
              I architect robust event-driven data pipelines (AWS, Kafka, PostgreSQL) and build full-stack generative AI solutions using frameworks like LangGraph and LangChain. 
              My core focus is designing fault-tolerant foundation libraries and automating complex enterprise workflows to drive measurable impact.
            </p>
          </motion.div>
        </section>

        <section id="experience" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Experience" className="section-title" />
            <Experience />
          </motion.div>
        </section>

        <section id="skills" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Skills" className="section-title" />
            <Skills />
          </motion.div>
        </section>

        <section id="projects" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Projects" className="section-title" />
            <Projects />
          </motion.div>
        </section>

        <section id="education" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Education" className="section-title" />
            <Education />
          </motion.div>
        </section>

        <section id="testimonials" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Testimonials" className="section-title" />
            <Testimonials />
          </motion.div>
        </section>

        <section id="blogs" className="page-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="section-container"
          >
            <ScrambleText as="h2" text="Blogs" className="section-title" />
            <Blogs />
          </motion.div>
        </section>

        <section id="contact" className="page-section">
          <motion.div 
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <ScrambleText as="h2" text="Contact" className="section-title" />
            <Contact />
          </motion.div>
        </section>
      </main>

      {/* Modern Minimalist Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Aviroop Banerjee. Architected for scale & reliability.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
