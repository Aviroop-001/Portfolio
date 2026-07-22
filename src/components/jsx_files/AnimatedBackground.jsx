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

    // Large Vibrant Floating Orbs (Emerald, Jade, Deep Teal)
    const orbs = [
      { x: width * 0.25, y: height * 0.25, radius: 340, vx: 0.45, vy: 0.35, color: 'rgba(2, 79, 55, 0.28)' },
      { x: width * 0.75, y: height * 0.65, radius: 380, vx: -0.35, vy: -0.45, color: 'rgba(16, 185, 129, 0.24)' },
      { x: width * 0.45, y: height * 0.85, radius: 300, vx: 0.3, vy: -0.35, color: 'rgba(15, 118, 110, 0.2)' },
      { x: width * 0.85, y: height * 0.2, radius: 280, vx: -0.4, vy: 0.3, color: 'rgba(52, 211, 153, 0.22)' }
    ];

    // Drifting Micro Particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45,
      opacity: Math.random() * 0.5 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Vibrant Floating Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -120 || orb.x > width + 120) orb.vx *= -1;
        if (orb.y < -120 || orb.y > height + 120) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Drifting Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(2, 79, 55, ${p.opacity * 0.7})`;
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
