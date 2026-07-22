import React, { useState, useMemo, useEffect, useRef } from 'react';
import "./App.scss";
import DesktopWindow from "./components/jsx_files/DesktopWindow";
import Intro from "./components/jsx_files/intro";
import Projects from "./components/jsx_files/Projects";
import Contact from "./components/jsx_files/Contact";
import Experience from './components/jsx_files/Experience';
import Skills from './components/jsx_files/Skills';
import Education from './components/jsx_files/Education';
import Testimonials from './components/jsx_files/Testimonials';
import WallpaperImageBackground from './components/jsx_files/WallpaperImageBackground';
import { 
  FiFileText, 
  FiGithub, 
  FiLinkedin,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiSun,
  FiMoon,
  FiCode,
  FiExternalLink
} from 'react-icons/fi';

function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [theme, setTheme] = useState('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const audioRef = useRef(null);

  // Apply theme to html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play error:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("banerjeeaviroop01@gmail.com");
      triggerToast("Email copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const sections = useMemo(() => [
    { id: 'intro', name: 'Intro', icon: '🏠' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'testimonials', name: 'Reviews', icon: '⭐' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'contact', name: 'Contact', icon: '📬' }
  ], []);

  const socialLinks = useMemo(() => [
    {
      id: 'resume',
      title: 'Resume.pdf',
      label: 'PDF Document',
      icon: <FiFileText />,
      url: 'https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link',
      type: 'pdf'
    },
    {
      id: 'github',
      title: 'GitHub.link',
      label: '@Aviroop-001',
      icon: <FiGithub />,
      url: 'https://github.com/Aviroop-001',
      type: 'link'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn.link',
      label: 'in/aviroopbanerjee',
      icon: <FiLinkedin />,
      url: 'https://www.linkedin.com/in/aviroopbanerjee/',
      type: 'link'
    },
    {
      id: 'leetcode',
      title: 'LeetCode.link',
      label: '@Aviroop_01',
      icon: <FiCode />,
      url: 'https://leetcode.com/Aviroop_01/',
      type: 'link'
    }
  ], []);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'intro':
        return <Intro />;
      case 'experience':
        return <Experience />;
      case 'skills':
        return <Skills />;
      case 'testimonials':
        return <Testimonials />;
      case 'education':
        return <Education />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Intro />;
    }
  };

  return (
    <div className="App">
      {/* High-Resolution Desktop Wallpaper Image */}
      <WallpaperImageBackground theme={theme} />
      {/* Hidden Audio Element for Synthwave Lofi */}
      <audio 
        ref={audioRef} 
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
      />

      {/* Top Retro OS Navbar (Height: 48px) */}
      <header className="top-os-navbar">
        <div className="navbar-left">
          <span className="os-brand" onClick={() => setShowAboutModal(true)} title="About AVI OS">
            🦔 AVI OS
          </span>
        </div>

        {/* Center: Audio Player Widget */}
        <div className="navbar-center">
          <div className="synthwave-audio-widget">
            <button className="audio-control-btn" onClick={togglePlayAudio} title={isPlaying ? "Pause Lofi" : "Play Lofi"}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
            <div className="audio-track-info">
              <span className="track-title">🎵 Synthwave Lofi</span>
              {isPlaying && (
                <div className="equalizer-bars">
                  <span className="bar bar-1" />
                  <span className="bar bar-2" />
                  <span className="bar bar-3" />
                  <span className="bar bar-4" />
                </div>
              )}
            </div>
            <button className="audio-control-btn mute-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
          </div>
        </div>

        {/* Right: Theme Toggle & System Badge */}
        <div className="navbar-right">
          <button 
            className="theme-toggle-pill"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <FiMoon className="theme-icon" /> : <FiSun className="theme-icon" />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          <span className="nav-badge" onClick={() => setShowAboutModal(true)}>AVI-OS v1.0</span>
        </div>
      </header>

      {/* Desktop Viewport Container */}
      <main className="desktop-main-viewport">
        {/* WALLPAPER DESKTOP ICONS (Left Navigation Column) */}
        <aside className="wallpaper-sidebar">
          <div className="wallpaper-group">
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={`wallpaper-icon-btn ${activeTab === sec.id ? 'active' : ''}`}
                onClick={() => setActiveTab(sec.id)}
                title={sec.name}
              >
                <div className="icon-box">{sec.icon}</div>
                <span className="icon-label">{sec.name}</span>
              </button>
            ))}
          </div>

          {/* Separator Line */}
          <div className="wallpaper-divider" />

          {/* DESKTOP LINKS FOLDER ICON */}
          <div className="wallpaper-group resources-group">
            <button 
              className="wallpaper-icon-btn links-folder-btn"
              onClick={() => setShowLinksModal(true)}
              title="Click to open Links Folder"
            >
              <div className="icon-box folder-box">
                📁
                <span className="folder-badge-count">4</span>
              </div>
              <span className="icon-label">Links</span>
            </button>
          </div>
        </aside>

        {/* OS DESKTOP WINDOW (Contains purely the active content section) */}
        <section className="window-viewport-container">
          <DesktopWindow 
            title={`avi-os / ${activeTab}.app`} 
            maxWidth="100%" 
            width="100%"
          >
            {renderActiveSection()}
          </DesktopWindow>
        </section>
      </main>

      {/* RETRO OS LINKS FOLDER MODAL OVERLAY */}
      {showLinksModal && (
        <div className="links-modal-overlay" onClick={() => setShowLinksModal(false)}>
          <div className="links-folder-window" onClick={(e) => e.stopPropagation()}>
            <div className="folder-window-header">
              <div className="window-dots">
                <span className="dot dot-red" onClick={() => setShowLinksModal(false)} />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="folder-window-title">📁 avi-os / links.folder</span>
              <button className="close-btn" onClick={() => setShowLinksModal(false)}>✕</button>
            </div>

            <div className="folder-window-body">
              <div className="folder-intro-bar">
                <span className="folder-path">Location: /Desktop/Links/</span>
                <span className="item-count">{socialLinks.length} Items</span>
              </div>

              <div className="folder-links-grid">
                {socialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="folder-item-card"
                  >
                    <div className="item-icon-box">
                      {item.icon}
                      <FiExternalLink className="ext-icon" />
                    </div>
                    <div className="item-text-info">
                      <span className="item-title">{item.title}</span>
                      <span className="item-label">{item.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About AVI OS Modal */}
      {showAboutModal && (
        <div className="about-modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="about-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <span className="brand-logo">🦔 AVI OS</span>
              <button className="close-btn" onClick={() => setShowAboutModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <h3>AVI OS v1.0</h3>
              <p>A PostHog-inspired retro desktop environment built for Aviroop Banerjee's engineering portfolio.</p>
              <div className="info-pills">
                <span className="info-pill">⚡ Built with React &amp; SCSS</span>
                <span className="info-pill">🎨 Light &amp; Dark Theme Engine</span>
                <span className="info-pill">🎵 Synthwave Lofi Audio Engine</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Toast Notification */}
      {toastMessage && (
        <div className="system-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
