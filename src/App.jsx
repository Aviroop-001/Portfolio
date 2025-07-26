import React, {useState, useEffect, useMemo} from 'react';
import "./App.scss";
import Intro from "./components/jsx_files/intro";
import Projects from "./components/jsx_files/Projects";
import Contact from "./components/jsx_files/Contact";
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import Education from './components/jsx_files/Education';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true); // Show initially

  const sections = useMemo(() => [
    { id: 'intro', name: 'Intro' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills' },
    { id: 'education', name: 'Education' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ], []);

  // Hide navigation after initial load
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 2500); // Show for 2.5 seconds initially

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show navigation when scrolling starts
      setIsScrolling(true);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Hide navigation after scrolling stops (800ms delay)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
      
      // Find which section is currently most visible
      let newActiveSection = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          
          // If we've scrolled past this section's start point minus 1/3 of window height
          if (scrollY >= elementTop - windowHeight / 3) {
            newActiveSection = index;
          }
        }
      });
      
      // Ensure we don't go out of bounds
      newActiveSection = Math.max(0, Math.min(newActiveSection, sections.length - 1));
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, sections]);

    const scrollToSection = (index) => {
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    if (element) {
      // Show navigation temporarily when clicking
      setIsScrolling(true);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

      return (
      <div className="App">
        <div className="sections">
          <Intro />
          <Experience />
          <Skills />
          <Education />
          <Projects />
          <Contact/>
        </div>

      {/* Floating Glass Navigation */}
      <div className={`floating-nav ${isScrolling ? 'visible' : 'hidden'}`}>
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            title={section.name}
          >
            <span className="nav-label">{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
