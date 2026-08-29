import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#';

export default function ScrambleText({ text, as: Component = 'span', className }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  // Trigger when it comes into view
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    let animationFrame;
    
    const animate = () => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        if (text[index] === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if (iteration >= text.length) {
        cancelAnimationFrame(animationFrame);
      } else {
        iteration += 1 / 2.5; // Adjust speed here (lower is slower)
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, text]);

  return (
    <Component ref={ref} className={className}>
      {displayText}
    </Component>
  );
}
