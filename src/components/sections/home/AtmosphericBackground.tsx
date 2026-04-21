'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  color: 'foundation' | 'ignition';
}

export default function AtmosphericBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 25, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 30 });

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.2 + Math.random() * 1.3,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 4,
        color: Math.random() > 0.85 ? 'ignition' : 'foundation',
      }))
    );
  }, []);

  const orb1X = useTransform(springX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [0, 1], [-20, 20]);
  const orb2X = useTransform(springX, [0, 1], [20, -20]);
  const orb2Y = useTransform(springY, [0, 1], [15, -15]);
  const orb4X = useTransform(springX, [0, 1], [-15, 15]);
  const orb4Y = useTransform(springY, [0, 1], [10, -10]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base — warm diagonal gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #EFEBE6 0%, #E8DDD3 40%, #E0CDBF 70%, #D4B8A5 100%)',
        }}
      />

      {/* Orb 1 — luminous white, top-left */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-15%',
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,252,247,0.95) 0%, rgba(255,252,247,0.6) 30%, rgba(255,252,247,0) 65%)',
          filter: 'blur(30px)',
          x: orb1X,
          y: orb1Y,
        }}
      />

      {/* Orb 2 — luminous white, top-right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,252,247,0.85) 0%, rgba(255,252,247,0.4) 35%, rgba(255,252,247,0) 70%)',
          filter: 'blur(40px)',
          x: orb2X,
          y: orb2Y,
        }}
      />

      {/* Orb 3 — Ignition Red accent, center — breathes slowly */}
      <motion.div
        animate={{ x: [-8, 8, -8], y: [-6, 6, -6] }}
        transition={{ duration: 24, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,68,68,0.25) 0%, rgba(198,68,68,0.1) 40%, rgba(198,68,68,0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Orb 4 — luminous white, bottom-right */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,252,247,0.7) 0%, rgba(255,252,247,0.3) 40%, rgba(255,252,247,0) 70%)',
          filter: 'blur(45px)',
          x: orb4X,
          y: orb4Y,
        }}
      />

      {/* Left-side light wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 80% at 0% 42%, rgba(239,235,230,0.32) 0%, rgba(239,235,230,0.12) 40%, transparent 70%)',
        }}
      />

      {/* Vignette — soft graduated darkening, center stays fully clean */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 80% at 50% 50%, transparent 0%, transparent 60%, rgba(73,72,72,0.04) 85%, rgba(73,72,72,0.09) 100%)',
          zIndex: 5,
        }}
      />

      {/* Vignette corners — very light diagonal accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0% 100%, rgba(73,72,72,0.06) 0%, transparent 25%),
            radial-gradient(circle at 100% 0%, rgba(73,72,72,0.05) 0%, transparent 30%)
          `,
          zIndex: 6,
        }}
      />

      {/* Central luminosity — brightens the headline zone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,253,249,0.35) 0%, transparent 60%)',
          zIndex: 4,
          mixBlendMode: 'screen',
        }}
      />

      {/* Particles — pulsing micro-dots, client-side only */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 7 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color === 'ignition' ? '#C64444' : '#494848',
              opacity: 0.3,
              animation: `particlePulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: p.color === 'ignition' ? '0 0 8px rgba(198,68,68,0.4)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Particle network — canvas-based animated connections */}
      <ParticleNetwork />

      {/* Grain — topmost layer to optically integrate everything below */}
      <div className="atmospheric-grain" aria-hidden="true" />
    </div>
  );
}
