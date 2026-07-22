import React from 'react';
import './HexTechBackground.scss';

export default function HexTechBackground() {
  // Generate 24 intersecting radial lines for Hex.tech spirograph
  const radialLines = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 * Math.PI) / 180;
    const x2 = 50 + 50 * Math.cos(angle);
    const y2 = 50 + 50 * Math.sin(angle);
    return { x2: `${x2}%`, y2: `${y2}%` };
  });

  // Generate concentric geometric rings
  const rings = [10, 20, 30, 40, 50, 65, 80, 95];

  return (
    <div className="hex-tech-bg-container">
      {/* Central Hex.tech Spirograph Lattice */}
      <svg className="hex-spirograph-svg" width="100%" height="100%" preserveAspectRatio="none">
        <g opacity="0.35">
          {/* Concentric Circles */}
          {rings.map((r, idx) => (
            <circle 
              key={idx} 
              cx="50%" 
              cy="45%" 
              r={`${r}%`} 
              fill="none" 
              stroke="var(--accent-yellow)" 
              strokeWidth="0.75" 
              strokeDasharray={idx % 2 === 0 ? "none" : "4 4"}
            />
          ))}

          {/* Radial Lines */}
          {radialLines.map((line, idx) => (
            <line 
              key={idx} 
              x1="50%" 
              y1="45%" 
              x2={line.x2} 
              y2={line.y2} 
              stroke="var(--accent-yellow)" 
              strokeWidth="0.75" 
            />
          ))}

          {/* Additional Intersecting Curved Web */}
          <circle cx="50%" cy="45%" r="25%" fill="none" stroke="var(--accent-yellow)" strokeWidth="0.75" />
          <circle cx="50%" cy="45%" r="45%" fill="none" stroke="var(--accent-yellow)" strokeWidth="0.75" />
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
