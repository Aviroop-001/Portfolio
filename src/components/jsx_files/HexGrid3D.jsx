import React from 'react';
import './HexGrid3D.scss';

export default function HexGrid3D() {
  return (
    <div className="hex-grid-3d-viewport">
      {/* 3D Perspective Plane */}
      <div className="hex-grid-perspective-plane">
        <svg className="hex-pattern-svg" width="100%" height="100%">
          <defs>
            <pattern 
              id="hex-pattern" 
              width="60" 
              height="104" 
              patternUnits="userSpaceOnUse" 
              patternTransform="scale(1)"
            >
              {/* Hexagon 1 */}
              <path 
                d="M 30,0 L 60,17.32 L 60,51.96 L 30,69.28 L 0,51.96 L 0,17.32 Z" 
                fill="none" 
                stroke="var(--accent-yellow)" 
                strokeWidth="1.5"
                opacity="0.55"
              />
              {/* Hexagon 2 Offset */}
              <path 
                d="M 0,51.96 L 30,69.28 L 30,103.92 L 0,121.24 L -30,103.92 L -30,69.28 Z" 
                fill="none" 
                stroke="var(--accent-yellow)" 
                strokeWidth="1.5"
                opacity="0.55"
              />
              {/* Hexagon 3 Offset */}
              <path 
                d="M 60,51.96 L 90,69.28 L 90,103.92 L 60,121.24 L 30,103.92 L 30,69.28 Z" 
                fill="none" 
                stroke="var(--accent-yellow)" 
                strokeWidth="1.5"
                opacity="0.55"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
      </div>

      {/* Ambient Horizon Glow Mask */}
      <div className="hex-horizon-mask" />
    </div>
  );
}
