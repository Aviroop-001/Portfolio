import React, { useState, useEffect } from 'react';
import './DesktopCatPet.scss';

export default function DesktopCatPet() {
  const [petCount, setPetCount] = useState(0);
  const [isPurring, setIsPurring] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [speech, setSpeech] = useState("Meow! Click to pet me! 🐱");
  const [hearts, setHearts] = useState([]);

  const catQuotes = [
    "Meow! Thanks for the scritches! 🥰",
    "Purrr... Avi is an awesome engineer! 🚀",
    "Meow! Check out Avi's cool projects! 💻",
    "Purrr! More head pats please! 🐾",
    "Meow! Hire Avi today! 💼",
    "Purrr... Avi builds fast AI systems! ⚡",
    "Meow! You are the best! ❤️"
  ];

  // Idle Sleep Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSleeping(true);
      setSpeech("Zzz... 💤");
    }, 15000);

    return () => clearTimeout(timer);
  }, [petCount]);

  const handlePetCat = () => {
    setIsSleeping(false);
    setIsPurring(true);
    setPetCount(prev => prev + 1);

    // Pick random quote
    const randomQuote = catQuotes[Math.floor(Math.random() * catQuotes.length)];
    setSpeech(randomQuote);

    // Spawn floating heart animation particle
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 40 - 20
    };
    setHearts(prev => [...prev.slice(-5), newHeart]);

    setTimeout(() => {
      setIsPurring(false);
    }, 800);
  };

  return (
    <div className="desktop-cat-companion" onClick={handlePetCat} title="Click to pet Milo the Cat!">
      {/* Cat Speech Bubble */}
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

      {/* Interactive Cat Mascot */}
      <div className={`cat-mascot-avatar ${isPurring ? 'bounce-purr' : ''} ${isSleeping ? 'sleeping' : ''}`}>
        <span className="cat-emoji">{isSleeping ? '😴' : isPurring ? '😻' : '🐱'}</span>
      </div>
    </div>
  );
}
