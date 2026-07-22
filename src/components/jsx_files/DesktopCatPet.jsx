import React, { useState, useEffect, useRef } from 'react';
import './DesktopCatPet.scss';

export default function DesktopCatPet() {
  const [isPurring, setIsPurring] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [speech, setSpeech] = useState("Pet me! 🐾");
  const [hearts, setHearts] = useState([]);
  const [posX, setPosX] = useState(120);

  // Web Audio Cat Purr Synthesizer Refs
  const audioCtxRef = useRef(null);
  const purrOscRef = useRef(null);
  const purrLfoRef = useRef(null);
  const purrGainRef = useRef(null);

  const catQuotes = [
    "Meow! Thanks for the scritches! 🥰",
    "Meow! Avi is a 10x engineer! 🚀",
    "Meow! Check out Avi's cool projects! 💻",
    "Meow! More head pats please! 🐾",
    "Meow! Hire Avi today! 💼",
    "Meow! Avi builds fast AI systems! ⚡",
    "Meow! You are the best! ❤️",
    "Meow! Did you try switching to Dark Mode? 🌙",
    "Meow! Avi wrote clean React & SCSS! 🎨",
    "Meow! I love sitting on this window! 🪟",
    "Meow! Avi's resume is 1 click away! 📄",
    "Meow! Best engineering portfolio ever! ⭐",
    "Meow! Feed me treats! 🐟",
    "Meow! Avi scales distributed backends! ⚡"
  ];

  // Synthesize realistic cat purring sound via Web Audio API
  const startCatPurrSound = () => {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop existing purr oscillator if playing
      if (purrOscRef.current) {
        try {
          purrOscRef.current.stop();
          purrOscRef.current.disconnect();
        } catch (e) {}
      }

      // Main rumble oscillator (68Hz low frequency cat purr frequency)
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(68, ctx.currentTime);

      // Low-Frequency Oscillator (LFO at 24Hz to create rhythmic purring vibration effect)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(24, ctx.currentTime);
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(14, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Master Purr Volume (cozy low volume)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc.start();
      lfo.start();

      purrOscRef.current = osc;
      purrLfoRef.current = lfo;
      purrGainRef.current = masterGain;
    } catch (err) {
      // Audio context autoplay restriction fallback
    }
  };

  const stopCatPurrSound = () => {
    try {
      if (purrGainRef.current && audioCtxRef.current) {
        purrGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.25);
        setTimeout(() => {
          if (purrOscRef.current) {
            purrOscRef.current.stop();
            purrOscRef.current.disconnect();
            purrOscRef.current = null;
          }
          if (purrLfoRef.current) {
            purrLfoRef.current.stop();
            purrLfoRef.current.disconnect();
            purrLfoRef.current = null;
          }
        }, 250);
      }
    } catch (err) {}
  };

  // Walking and sleeping loop
  useEffect(() => {
    const sleepTimer = setTimeout(() => {
      setIsSleeping(true);
      setSpeech("Zzz... 💤");
    }, 15000);

    const walkInterval = setInterval(() => {
      if (!isSleeping && !isPurring) {
        setPosX(prev => {
          const delta = (Math.random() > 0.5 ? 25 : -25);
          return Math.max(50, Math.min(prev + delta, 420));
        });
      }
    }, 5000);

    return () => {
      clearTimeout(sleepTimer);
      clearInterval(walkInterval);
    };
  }, [isSleeping, isPurring]);

  // ON HOVER: Cat purrs, says "Purr purr... 🥰", and plays synthesized purr sound!
  const handleMouseEnter = () => {
    setIsSleeping(false);
    setIsPurring(true);
    setSpeech("Purr purr... 🥰");
    startCatPurrSound();
  };

  const handleMouseLeave = () => {
    setIsPurring(false);
    stopCatPurrSound();
  };

  // ON CLICK: Say fun cat quotes, play purr audio pulse & spawn hearts!
  const handlePetCat = () => {
    setIsSleeping(false);
    startCatPurrSound();

    const randomQuote = catQuotes[Math.floor(Math.random() * catQuotes.length)];
    setSpeech(randomQuote);

    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 20 - 10
    };
    setHearts(prev => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      stopCatPurrSound();
    }, 1200);
  };

  return (
    <div 
      className="desktop-pixel-cat" 
      style={{ left: `${posX}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePetCat} 
      title="Hover over Milo to hear him purr!"
    >
      {/* Speech Bubble Above Cat */}
      <div className={`cat-speech-bubble ${isPurring ? 'purring' : ''}`}>
        <span>{speech}</span>
      </div>

      {/* Floating Heart Particles */}
      <div className="floating-hearts-container">
        {hearts.map(h => (
          <span key={h.id} className="floating-heart" style={{ left: `${h.left}px` }}>
            ❤️
          </span>
        ))}
      </div>

      {/* Adorable Orange / Ginger Tabby Cat Character Sprite */}
      <div className={`pixel-cat-body ${isPurring ? 'bounce-purr' : ''} ${isSleeping ? 'sleeping' : ''}`}>
        <svg className="pixel-cat-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fluffy Orange Tail */}
          <path 
            d="M6 22 C3 18, 2 13, 5 10 C8 8, 10 11, 8 13 C6 16, 7 19, 9 22 Z" 
            fill="#FF9F1C" 
            className="cat-tail-anim" 
          />
          {/* Tail Stripes */}
          <path d="M5 12 C6 11, 7 12, 6 13" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" className="cat-tail-anim" />

          {/* Main Orange Body */}
          <path d="M8 20 C8 15, 12 13, 18 13 C24 13, 28 15, 28 20 C28 26, 25 28, 18 28 C11 28, 8 26, 8 20 Z" fill="#FF9F1C" />
          
          {/* Tabby Body Stripes */}
          <path d="M12 15 C13 17, 13 20, 12 22" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 15 C23 17, 23 20, 24 22" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />

          {/* Fluffy White Chest */}
          <path d="M14 19 C14 17, 22 17, 22 19 C22 25, 20 27, 18 27 C16 27, 14 25, 14 19 Z" fill="#FFFFFF" />

          {/* Left Ear */}
          <polygon points="11,13 13,4 17,11" fill="#FF9F1C" />
          <polygon points="12,12 13.5,6 16,10" fill="#FFB6C1" />

          {/* Right Ear */}
          <polygon points="25,13 23,4 19,11" fill="#FF9F1C" />
          <polygon points="24,12 22.5,6 20,10" fill="#FFB6C1" />

          {/* Cute Round Head */}
          <circle cx="18" cy="12" r="7" fill="#FF9F1C" />

          {/* Tabby Head Stripe */}
          <path d="M18 6 L18 8.5" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 7 L16 9" stroke="#E67E22" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M20 7 L20 9" stroke="#E67E22" strokeWidth="1.2" strokeLinecap="round" />

          {/* Cute Eyes */}
          {isSleeping ? (
            <>
              <path d="M13.5 12 Q15.5 14 16.5 12" stroke="#4A2810" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M19.5 12 Q20.5 14 22.5 12" stroke="#4A2810" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          ) : isPurring ? (
            <>
              <text x="13" y="14" fontSize="7" fill="#FF5F56" fontWeight="bold">♥</text>
              <text x="19.5" y="14" fontSize="7" fill="#FF5F56" fontWeight="bold">♥</text>
            </>
          ) : (
            <>
              <ellipse cx="15" cy="11.5" rx="1.5" ry="2" fill="#2D1810" />
              <ellipse cx="21" cy="11.5" rx="1.5" ry="2" fill="#2D1810" />
              <circle cx="15.4" cy="10.8" r="0.6" fill="#FFFFFF" />
              <circle cx="21.4" cy="10.8" r="0.6" fill="#FFFFFF" />
            </>
          )}

          {/* Pink Nose & Whiskers */}
          <polygon points="17.2,13.2 18.8,13.2 18,14.3" fill="#FF80AB" />
          <path d="M17 14.5 Q18 15.5 19 14.5" stroke="#4A2810" strokeWidth="1" fill="none" />
          
          <line x1="9" y1="12" x2="13.5" y2="13" stroke="#4A2810" strokeWidth="0.8" opacity="0.6" />
          <line x1="9" y1="14" x2="13.5" y2="14.5" stroke="#4A2810" strokeWidth="0.8" opacity="0.6" />
          <line x1="27" y1="12" x2="22.5" y2="13" stroke="#4A2810" strokeWidth="0.8" opacity="0.6" />
          <line x1="27" y1="14" x2="22.5" y2="14.5" stroke="#4A2810" strokeWidth="0.8" opacity="0.6" />

          {/* White Little Paws */}
          <ellipse cx="12.5" cy="27.5" rx="2.5" ry="1.6" fill="#FFFFFF" stroke="#FF9F1C" strokeWidth="0.5" />
          <ellipse cx="23.5" cy="27.5" rx="2.5" ry="1.6" fill="#FFFFFF" stroke="#FF9F1C" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}
