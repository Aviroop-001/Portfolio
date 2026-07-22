import React, { useState, useEffect } from 'react';
import './DesktopCatPet.scss';

export default function DesktopCatPet() {
  const [petCount, setPetCount] = useState(0);
  const [isPurring, setIsPurring] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [speech, setSpeech] = useState("Meow! Scritch me! 🐾");
  const [hearts, setHearts] = useState([]);
  const [posX, setPosX] = useState(110);

  const catQuotes = [
    "Meow! Thanks for the scritches! 🥰",
    "Purrr... Avi is a 10x engineer! 🚀",
    "Meow! Check out Avi's projects! 💻",
    "Purrr! More head pats please! 🐾",
    "Meow! Hire Avi today! 💼",
    "Purrr... Avi builds fast AI systems! ⚡",
    "Meow! You are the best! ❤️"
  ];

  // Walking and sleeping loop
  useEffect(() => {
    const sleepTimer = setTimeout(() => {
      setIsSleeping(true);
      setSpeech("Zzz... 💤");
    }, 14000);

    const walkInterval = setInterval(() => {
      if (!isSleeping && !isPurring) {
        setPosX(prev => {
          const delta = (Math.random() > 0.5 ? 20 : -20);
          return Math.max(50, Math.min(prev + delta, 420));
        });
      }
    }, 5000);

    return () => {
      clearTimeout(sleepTimer);
      clearInterval(walkInterval);
    };
  }, [petCount, isSleeping, isPurring]);

  const handlePetCat = () => {
    setIsSleeping(false);
    setIsPurring(true);
    setPetCount(prev => prev + 1);

    const randomQuote = catQuotes[Math.floor(Math.random() * catQuotes.length)];
    setSpeech(randomQuote);

    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 20 - 10
    };
    setHearts(prev => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setIsPurring(false);
    }, 750);
  };

  return (
    <div 
      className="desktop-pixel-cat" 
      style={{ left: `${posX}px` }}
      onClick={handlePetCat} 
      title="Click to pet Milo the Cat!"
    >
      {/* Speech Bubble Above Cat */}
      <div className={`cat-speech-bubble ${isPurring ? 'purring' : ''}`}>
        <span>{speech}</span>
        {petCount > 0 && <span className="pet-count-badge">{petCount} 🐾</span>}
      </div>

      {/* Floating Heart Particles */}
      <div className="floating-hearts-container">
        {hearts.map(h => (
          <span key={h.id} className="floating-heart" style={{ left: `${h.left}px` }}>
            ❤️
          </span>
        ))}
      </div>

      {/* Pure Pixel Cat Character Sprite (NO CIRCLE, NO BACKGROUND) */}
      <div className={`pixel-cat-body ${isPurring ? 'bounce-purr' : ''} ${isSleeping ? 'sleeping' : ''}`}>
        <svg className="pixel-cat-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tail */}
          <path d="M5 20 C2 16, 2 12, 5 10 C7 9, 8 11, 7 13 C6 15, 6 18, 8 20 Z" fill={isPurring ? "#024F37" : "#1A1A1A"} className="cat-tail-anim" />
          
          {/* Body */}
          <path d="M7 18 C7 14, 11 12, 16 12 C21 12, 25 14, 25 18 C25 24, 22 26, 16 26 C10 26, 7 24, 7 18 Z" fill={isPurring ? "#024F37" : "#1A1A1A"} />
          
          {/* White Tuxedo Chest */}
          <path d="M13 18 C13 16, 19 16, 19 18 C19 23, 18 25, 16 25 C14 25, 13 23, 13 18 Z" fill="#FFFFFF" />
          
          {/* Ears */}
          <polygon points="10,12 12,4 16,10" fill={isPurring ? "#024F37" : "#1A1A1A"} />
          <polygon points="11,11 12.5,6 15,10" fill="#FFB6C1" />
          
          <polygon points="22,12 20,4 16,10" fill={isPurring ? "#024F37" : "#1A1A1A"} />
          <polygon points="21,11 19.5,6 17,10" fill="#FFB6C1" />

          {/* Head */}
          <circle cx="16" cy="11" r="6" fill={isPurring ? "#024F37" : "#1A1A1A"} />

          {/* Eyes */}
          {isSleeping ? (
            <>
              <path d="M12 11 Q14 13 15 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M17 11 Q18 13 20 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          ) : isPurring ? (
            <>
              <text x="11.5" y="13" fontSize="6" fill="#FF5F56" fontWeight="bold">♥</text>
              <text x="17.5" y="13" fontSize="6" fill="#FF5F56" fontWeight="bold">♥</text>
            </>
          ) : (
            <>
              <ellipse cx="13.5" cy="10.5" rx="1.2" ry="1.8" fill="#52B788" />
              <ellipse cx="18.5" cy="10.5" rx="1.2" ry="1.8" fill="#52B788" />
              <circle cx="13.8" cy="10" r="0.5" fill="#FFFFFF" />
              <circle cx="18.8" cy="10" r="0.5" fill="#FFFFFF" />
            </>
          )}

          {/* Nose & Whiskers */}
          <polygon points="15.2,12 16.8,12 16,13.2" fill="#FFB6C1" />
          <line x1="8" y1="11" x2="12" y2="12" stroke="#CCCCCC" strokeWidth="0.8" />
          <line x1="8" y1="13" x2="12" y2="13.5" stroke="#CCCCCC" strokeWidth="0.8" />
          <line x1="24" y1="11" x2="20" y2="12" stroke="#CCCCCC" strokeWidth="0.8" />
          <line x1="24" y1="13" x2="20" y2="13.5" stroke="#CCCCCC" strokeWidth="0.8" />

          {/* Paws */}
          <ellipse cx="11" cy="25" rx="2.5" ry="1.5" fill="#FFFFFF" />
          <ellipse cx="21" cy="25" rx="2.5" ry="1.5" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}
