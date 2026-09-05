import React, { useState, useEffect } from 'react';
import './global.scss';
import './App.scss';
import Intro from "./components/jsx_files/intro";
import CustomCursor from './components/jsx_files/CustomCursor';
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import AgenticSystemVisualizer from './components/jsx_files/AgenticSystemVisualizer';
import Projects from './components/jsx_files/Projects';
import Education from './components/jsx_files/Education';
import Testimonials from './components/jsx_files/Testimonials';
import Blogs from './components/jsx_files/Blogs';
import Contact from './components/jsx_files/Contact';
import { 
  FiGithub, 
  FiLinkedin,
  FiCode,
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
  
  // Always default strictly to dark mode on initial load
  const [theme, setTheme] = useState('dark');

  // Apply theme to HTML root and body elements
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'experience', 'skills', 'projects', 'education', 'testimonials', 'blogs', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {navLinks.map(link => (
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
              setIsMobileMenuOpen(false);
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
          >
            <span className="search-icon">🔍</span>
            <span className="kb-shortcut">⌘K Search</span>
          </button>
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            Résumé
          </a>
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
          </button>
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

        <section id="agentic-architecture" className="agentic-page-section">
          <AgenticSystemVisualizer />
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
          >
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

      {/* Floating Socials Pill */}
      <div className="floating-socials-pill">
        <a href="https://github.com/Aviroop-001" target="_blank" rel="noreferrer" title="GitHub"><FiGithub /></a>
        <a href="https://www.linkedin.com/in/aviroopbanerjee/" target="_blank" rel="noreferrer" title="LinkedIn"><FiLinkedin /></a>
        <a href="https://leetcode.com/Aviroop_01/" target="_blank" rel="noreferrer" title="LeetCode"><FiCode /></a>
      </div>
    </div>
  );
}

export default App;
