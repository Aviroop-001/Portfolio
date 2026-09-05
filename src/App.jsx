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
            
            {/* Modern Bento Grid */}
            <div className="about-bento-grid">
              {/* Card 1: Scalability, Performant & Platform Architecture */}
              <div className="bento-card bento-hero">
                <div className="bento-card-header">
                  <span className="card-badge">ENGINEERING PHILOSOPHY</span>
                </div>
                <h3 className="hero-title">Scalability, Performant & Platform Architecture</h3>
                <p className="hero-desc">
                  Software Engineer focused on architecting highly scalable backends, performant microservices, and resilient platform infrastructure. I design standardized golden path foundation libraries, event-driven data pipelines (AWS Lambda, S3, Kafka), and multi-agent LLM systems engineered for predictable high-concurrency scale.
                </p>
              </div>

              {/* Card 2: Location & Scope */}
              <div className="bento-card bento-location">
                <div className="bento-card-header">
                  <span className="card-badge">LOCATION & SCOPE</span>
                </div>
                <div className="loc-content">
                  <span className="loc-pin">📍 Bangalore, India</span>
                  <p className="loc-sub">Distributed Backends • Platform Architecture • Performant Systems</p>
                </div>
              </div>

              {/* Card 3: 5 Key Resume Impact Metrics */}
              <div className="bento-card bento-metrics">
                <div className="bento-card-header">
                  <span className="card-badge">RESUME IMPACT METRICS</span>
                </div>
                <div className="metrics-bento-grid">
                  <div className="m-item">
                    <span className="m-val">15×</span>
                    <span className="m-lbl">Triage Speedup</span>
                  </div>
                  <div className="m-item">
                    <span className="m-val">11M</span>
                    <span className="m-lbl">Users Served</span>
                  </div>
                  <div className="m-item">
                    <span className="m-val">&lt;150ms</span>
                    <span className="m-lbl">API Response Latency</span>
                  </div>
                  <div className="m-item">
                    <span className="m-val">100%</span>
                    <span className="m-lbl">Guarded Checkpoints</span>
                  </div>
                  <div className="m-item">
                    <span className="m-val">23+</span>
                    <span className="m-lbl">Production Tickets</span>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Floating Socials Pill */}
      <div className="floating-socials-pill">
        <a href="https://github.com/Aviroop-001" target="_blank" rel="noreferrer" title="GitHub"><FiGithub /></a>
        <a href="https://www.linkedin.com/in/aviroop-banerjee-0775a621b/" target="_blank" rel="noreferrer" title="LinkedIn"><FiLinkedin /></a>
        <a href="https://leetcode.com/Aviroop_01/" target="_blank" rel="noreferrer" title="LeetCode"><FiCode /></a>
      </div>
    </div>
  );
}

export default App;
