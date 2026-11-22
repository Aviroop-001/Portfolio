import React, { useEffect, useRef } from 'react';
import './CustomCursor.scss';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const pathRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const points = useRef([]);
  const segments = 12;

  useEffect(() => {
    // Disable completely on touch devices to save battery and main thread cycles
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    for (let i = 0; i < segments; i++) {
      points.current.push({ x: -100, y: -100 });
    }

    let isLoopRunning = false;
    let animId = null;

    const startAnimationLoop = () => {
      if (isLoopRunning) return;
      isLoopRunning = true;
      animId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      startAnimationLoop();
    };

    let isPointerActive = false;
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !cursorDotRef.current) return;

      const shouldBePointer = Boolean(
        target.closest('a, button, .tab-btn, .email-box, [role="button"], .blog-card, .project-card, .cmd-k-hint, .theme-toggle-btn')
      );

      if (shouldBePointer !== isPointerActive) {
        isPointerActive = shouldBePointer;
        cursorDotRef.current.classList.toggle('pointer', isPointerActive);
        if (cursorGlowRef.current) {
          cursorGlowRef.current.classList.toggle('pointer', isPointerActive);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    const animate = () => {
      const pts = points.current;

      // Snappy trailing spring for SVG curve
      for (let i = segments - 1; i > 0; i--) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.68;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.68;
      }
      pts[0].x = mouse.current.x;
      pts[0].y = mouse.current.y;

      if (pathRef.current) {
        let d = `M ${pts[0].x} ${pts[0].y} `;
        for (let i = 1; i < segments - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          d += `Q ${pts[i].x} ${pts[i].y}, ${xc} ${yc} `;
        }
        d += `L ${pts[segments - 1].x} ${pts[segments - 1].y}`;
        pathRef.current.setAttribute("d", d);
      }

      // Smooth lag glow using GPU translate3d (avoids CSS left/top reflows)
      if (cursorGlowRef.current) {
        glow.current.x += (mouse.current.x - glow.current.x) * 0.15;
        glow.current.y += (mouse.current.y - glow.current.y) * 0.15;
        cursorGlowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) translate(-50%, -50%)`;
      }

      // If trail and glow have fully settled at current mouse position, sleep loop to save 100% CPU/GPU cycles during scroll
      const glowDiff = Math.abs(mouse.current.x - glow.current.x) + Math.abs(mouse.current.y - glow.current.y);
      const tailDiff = Math.abs(mouse.current.x - pts[segments - 1].x) + Math.abs(mouse.current.y - pts[segments - 1].y);

      if (glowDiff < 0.2 && tailDiff < 0.5) {
        isLoopRunning = false;
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    startAnimationLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <svg 
        className="cursor-trail-svg ph-no-capture" 
        data-ph-no-capture="true"
        aria-hidden="true"
      >
        <path ref={pathRef} className="cursor-trail-path ph-no-capture" data-ph-no-capture="true" />
      </svg>
      <div 
        ref={cursorDotRef}
        className="custom-cursor ph-no-capture" 
        data-ph-no-capture="true"
        aria-hidden="true"
      />
      <div 
        ref={cursorGlowRef}
        className="custom-cursor-glow ph-no-capture" 
        data-ph-no-capture="true"
        aria-hidden="true"
      />
    </>
  );
}
