import React, {useState, useEffect, useMemo, useRef} from 'react';
import "./App.scss";
import Intro from "./components/jsx_files/intro";
import Projects from "./components/jsx_files/Projects";
import Contact from "./components/jsx_files/Contact";
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import Education from './components/jsx_files/Education';
import { AiOutlineUp } from 'react-icons/ai';
import { Box, Text } from "@chakra-ui/react";

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true); // Show initially
  const [revealedSections, setRevealedSections] = useState(new Set(['intro']));
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef(null);

  const sections = useMemo(() => [
    { id: 'intro', name: 'Intro' },
    { id: 'experience', name: 'Experience' },
    { id: 'skills', name: 'Skills' },
    { id: 'education', name: 'Education' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ], []);

  // Loading animation - show for 5 seconds
  useEffect(() => {
    console.log('Loading started, isLoading:', isLoading);
    const loadingTimer = setTimeout(() => {
      console.log('Loading timer finished, setting isLoading to false');
      setIsLoading(false);
    }, 5000); // Show loading for 5 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  // Debug loading state changes
  useEffect(() => {
    console.log('Loading state changed:', isLoading);
  }, [isLoading]);

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
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Update scroll position for parallax
      setScrollY(currentScrollY);
      
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
          const elementTop = rect.top + currentScrollY;
          
          // If we've scrolled past this section's start point minus 1/3 of window height
          if (currentScrollY >= elementTop - windowHeight / 3) {
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

  // Scroll reveal animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealedSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '-50px 0px' // Start animation 50px before element comes into view
      }
    );

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

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

  const scrollToTop = () => {
    // Show navigation temporarily when clicking
    setIsScrolling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

        return (
    <div className="App">
      {/* Loading Screen */}
      <div 
        className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #050404 0%, #0F1419 25%, #1A1612 50%, #2D2520 75%, #3A352E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          opacity: isLoading ? 1 : 0,
          visibility: isLoading ? 'visible' : 'hidden',
          transition: 'all 0.8s ease'
        }}
      >
                 <div className="loading-content" style={{ textAlign: 'center', color: '#EAE0D5' }}>
          <div 
            className="loading-spinner"
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem'
            }}
          >
            {/* Ring 1 - Outermost, slowest, clockwise */}
            <div 
              className="spinner-ring-1"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '2px solid transparent',
                borderTop: '2px solid rgba(234, 224, 213, 0.7)',
                borderRadius: '50%',
                animation: 'spin 4s linear infinite'
              }}
            ></div>
            {/* Ring 2 - 2nd, slow, counterclockwise */}
            <div 
              className="spinner-ring-2"
              style={{
                position: 'absolute',
                width: '80%',
                height: '80%',
                top: '10%',
                left: '10%',
                border: '2px solid transparent',
                borderTop: '2px solid rgba(198, 172, 142, 0.6)',
                borderRadius: '50%',
                animation: 'spinReverse 3s linear infinite'
              }}
            ></div>
            {/* Ring 3 - 3rd, medium speed, clockwise (same as ring 1) */}
            <div 
              className="spinner-ring-3"
              style={{
                position: 'absolute',
                width: '60%',
                height: '60%',
                top: '20%',
                left: '20%',
                border: '2px solid transparent',
                borderTop: '2px solid rgba(234, 224, 213, 0.5)',
                borderRadius: '50%',
                animation: 'spin 2s linear infinite'
              }}
            ></div>
            {/* Ring 4 - Innermost, fastest, counterclockwise (same as ring 2) */}
            <div 
              className="spinner-ring-4"
              style={{
                position: 'absolute',
                width: '40%',
                height: '40%',
                top: '30%',
                left: '30%',
                border: '2px solid transparent',
                borderTop: '2px solid rgba(198, 172, 142, 0.4)',
                borderRadius: '50%',
                animation: 'spinReverse 1s linear infinite'
              }}
            ></div>
          </div>
          <div 
            className="loading-text"
            style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'rgba(234, 224, 213, 0.8)',
              letterSpacing: '1px',
              textAlign: 'center'
            }}
          >
            <span>Loading Portfolio</span>
          </div>
        </div>
      </div>
        {/* Parallax Background Elements */}
        <div className="parallax-elements">
          <div 
            className="parallax-element circle-1"
            style={{
              transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`
            }}
          />
          <div 
            className="parallax-element circle-2"
            style={{
              transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.05}deg)`
            }}
          />
          <div 
            className="parallax-element triangle-1"
            style={{
              transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.08}deg)`
            }}
          />
          <div 
            className="parallax-element square-1"
            style={{
              transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.03}deg)`
            }}
          />
        </div>
        
        <div className="sections">
        <div id="intro" className={`section-wrapper ${revealedSections.has('intro') ? 'revealed' : ''}`}>
          <Intro />
        </div>
        <div id="experience" className={`section-wrapper ${revealedSections.has('experience') ? 'revealed' : ''}`}>
          <Experience />
        </div>
        <div id="skills" className={`section-wrapper ${revealedSections.has('skills') ? 'revealed' : ''}`}>
          <Skills />
        </div>
        <div id="education" className={`section-wrapper ${revealedSections.has('education') ? 'revealed' : ''}`}>
          <Education />
        </div>
        <div id="projects" className={`section-wrapper ${revealedSections.has('projects') ? 'revealed' : ''}`}>
          <Projects />
        </div>
        <div id="contact" className={`section-wrapper ${revealedSections.has('contact') ? 'revealed' : ''}`}>
          <Contact/>
        </div>
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

        {/* Back to Top Button */}
        {activeSection > 0 && (
          <Box 
            className="back-to-top"
            onClick={scrollToTop}
            title="Back to Top"
            style={{
              position: 'fixed',
              bottom: '2.5rem',
              right: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'rgba(198, 172, 142, 0.7)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              animation: 'bounce 1s ease-in-out infinite',
              borderRadius: '8px',
              padding: '0.5rem'
            }}
            _hover={{
              color: 'rgba(234, 224, 213, 0.9)',
              transform: 'translateY(-3px)'
            }}
          >
            <AiOutlineUp 
              className="back-to-top-arrow"
              style={{
                fontSize: '1.3rem',
                marginBottom: '0.6rem'
              }}
            />
            <Text 
              className="back-to-top-text"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 300,
                color: 'inherit'
              }}
            >
              Back to top
            </Text>
          </Box>
        )}
      </div>
    );
  }

export default App;
