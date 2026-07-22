import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.scss';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Apple VisionOS Vivid Floating Ambient Orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.25, radius: 360, vx: 0.5, vy: 0.4, colorLight: 'rgba(2, 79, 55, 0.35)', colorDark: 'rgba(52, 211, 153, 0.35)' },
      { x: width * 0.8, y: height * 0.7, radius: 420, vx: -0.4, vy: -0.5, colorLight: 'rgba(16, 185, 129, 0.3)', colorDark: 'rgba(16, 185, 129, 0.3)' },
      { x: width * 0.5, y: height * 0.85, radius: 320, vx: 0.35, vy: -0.4, colorLight: 'rgba(15, 118, 110, 0.25)', colorDark: 'rgba(20, 184, 166, 0.25)' },
      { x: width * 0.85, y: height * 0.2, radius: 300, vx: -0.45, vy: 0.35, colorLight: 'rgba(245, 158, 11, 0.22)', colorDark: 'rgba(251, 191, 36, 0.2)' }
    ];

    // Drifting Micro Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Render Floating Aurora Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -140 || orb.x > width + 140) orb.vx *= -1;
        if (orb.y < -140 || orb.y > height + 140) orb.vy *= -1;

        const color = isDark ? orb.colorDark : orb.colorLight;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Micro Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${p.opacity})` : `rgba(2, 79, 55, ${p.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-canvas-bg" />;
}
