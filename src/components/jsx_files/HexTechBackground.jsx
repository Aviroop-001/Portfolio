import React from 'react';
import './HexTechBackground.scss';

export default function HexTechBackground() {
  // Generate 36 intersecting radial lines for Hex.tech spirograph
  const radialLines = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 * Math.PI) / 180;
    const x2 = 50 + 50 * Math.cos(angle);
    const y2 = 50 + 50 * Math.sin(angle);
    return { x2: `${x2}%`, y2: `${y2}%` };
  });

  // Concentric geometric rings
  const rings = [8, 16, 26, 38, 52, 68, 85, 100];

  return (
    <div className="hex-tech-bg-container">
      {/* Central Hex.tech Spirograph Lattice */}
      <svg className="hex-spirograph-svg" width="100%" height="100%" preserveAspectRatio="none">
        <g opacity="0.75">
          {/* Concentric Circles */}
          {rings.map((r, idx) => (
            <circle 
              key={idx} 
              cx="50%" 
              cy="48%" 
              r={`${r}%`} 
              fill="none" 
              stroke="var(--accent-yellow)" 
              strokeWidth="1.3" 
              strokeDasharray={idx % 2 === 0 ? "none" : "6 4"}
            />
          ))}

          {/* Radial Intersecting Web Rays */}
          {radialLines.map((line, idx) => (
            <line 
              key={idx} 
              x1="50%" 
              y1="48%" 
              x2={line.x2} 
              y2={line.y2} 
              stroke="var(--accent-yellow)" 
              strokeWidth="1.3" 
            />
          ))}

          {/* Additional Outer Web Rings */}
          <circle cx="50%" cy="48%" r="32%" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.3" />
          <circle cx="50%" cy="48%" r="60%" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.3" />
        </g>
      </svg>

      {/* Hex.tech Micro-Dot Overlay */}
      <div className="hex-dot-matrix-overlay" />

      {/* Technical Corner Crosshairs (+) */}
      <div className="hex-corner-mark top-left">+</div>
      <div className="hex-corner-mark top-right">+</div>
      <div className="hex-corner-mark bottom-left">+</div>
      <div className="hex-corner-mark bottom-right">+</div>
    </div>
  );
}
