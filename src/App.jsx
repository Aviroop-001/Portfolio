import React, { useState, useEffect } from 'react';
import './global.scss';
import './App.scss';
import Intro from "./components/jsx_files/intro";
import Projects from "./components/jsx_files/Projects";
import Contact from "./components/jsx_files/Contact";
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import Education from './components/jsx_files/Education';
import Testimonials from './components/jsx_files/Testimonials';
import CustomCursor from './components/jsx_files/CustomCursor';
import { 
  FiGithub, 
  FiLinkedin,
  FiCode
} from 'react-icons/fi';

import { motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";
import ScrambleText from './components/jsx_files/ScrambleText';
import CommandPalette from './components/jsx_files/CommandPalette';
import Blogs from './components/jsx_files/Blogs';

function App() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');

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
    { id: 'intro', name: 'Home' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'education', name: 'Education' },
    { id: 'testimonials', name: 'Reviews' },
    { id: 'blogs', name: 'Writing' },
    { id: 'contact', name: 'Contact' }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const handlePreviewResume = () => {
    if (window.innerWidth <= 768) {
      window.open("https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link", "_blank");
    } else {
      setShowResumeModal(true);
    }
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
            href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link"
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
            <Intro onPreviewResume={handlePreviewResume} />
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

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <span className="modal-title">Resume Preview</span>
              <button className="close-btn" onClick={() => setShowResumeModal(false)}>✕</button>
            </div>
            <div className="resume-modal-body">
              <iframe
                src="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/preview"
                width="100%"
                height="100%"
                title="Aviroop Banerjee Resume Preview"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
