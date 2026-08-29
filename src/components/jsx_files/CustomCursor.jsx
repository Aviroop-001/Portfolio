import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.scss';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const pathRef = useRef(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef([]);
  const segments = 25; // Number of points in the trail

  useEffect(() => {
    // Initialize points for the trail
    for (let i = 0; i < segments; i++) {
      points.current.push({ x: 0, y: 0 });
    }

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.tab-btn')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop for the SVG trailing path
    const animate = () => {
      let pts = points.current;
      
      // Shift historical points to follow the EXACT path taken
      for (let i = segments - 1; i > 0; i--) {
        // Easing the history points towards the previous point creates a snake that 
        // follows the exact path, and elegantly retracts when the mouse stops.
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.5;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.5;
      }
      pts[0].x = mouse.current.x;
      pts[0].y = mouse.current.y;

      if (pathRef.current) {
        // Construct SVG path curve
        let d = `M ${pts[0].x} ${pts[0].y} `;
        for (let i = 1; i < segments - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          d += `Q ${pts[i].x} ${pts[i].y}, ${xc} ${yc} `;
        }
        d += `L ${pts[segments - 1].x} ${pts[segments - 1].y}`;
        pathRef.current.setAttribute("d", d);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <svg className="cursor-trail-svg">
        <path ref={pathRef} className="cursor-trail-path" />
      </svg>
      <div 
        className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-glow ${isPointer ? 'pointer' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
