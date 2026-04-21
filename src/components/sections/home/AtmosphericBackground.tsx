'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AtmosphericBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 16, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 16, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const lightX = useTransform(springX, [0, 1], [-14, 14]);
  const lightY = useTransform(springY, [0, 1], [-9, 9]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ── Layer 1 — Base field ─────────────────────────────────────────────
          Mineral off-white diagonal. Left is clean and bright.
          Right carries controlled warmth. No visible transition edge.       */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(155deg, #F5F3F0 0%, #EFE9E2 38%, #E8DDD1 66%, #E2D5C3 100%)',
        }}
      />

      {/* ── Layer 2 — Left luminosity field ─────────────────────────────────
          Brightens the text zone. Extremely soft ellipse, not a shape.
          Parallax-linked: floats very gently with cursor.                   */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 72% 95% at -2% 42%, rgba(255,254,252,0.60) 0%, rgba(255,253,251,0.30) 32%, rgba(255,252,250,0.10) 58%, transparent 76%)',
          x: lightX,
          y: lightY,
        }}
      />

      {/* ── Layer 2b — Directional reinforcement ────────────────────────────
          Horizontal band that increases left-right tonal separation.
          Barely perceptible, but critical for depth.                        */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(255,254,252,0.28) 0%, rgba(255,253,251,0.10) 26%, transparent 48%)',
        }}
      />

      {/* ── Layer 3 — Energy bloom ───────────────────────────────────────────
          The focal point. Warm depth, center-right.
          Not a blob — an enormous, highly diffused field.
          Breathes very slowly. Reads as air temperature, not shape.         */}
      <motion.div
        animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }}
        transition={{ duration: 42, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '28%',
          width: '120%',
          height: '130%',
          background: 'radial-gradient(ellipse 52% 58% at 52% 50%, rgba(110,50,35,0.13) 0%, rgba(110,50,35,0.055) 40%, rgba(110,50,35,0.015) 62%, transparent 78%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ── Depth anchor — bottom-right ──────────────────────────────────────
          Grounds the composition. Prevents the right side from floating.    */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 60% at 102% 105%, rgba(95,44,28,0.09) 0%, rgba(95,44,28,0.03) 48%, transparent 70%)',
        }}
      />

      {/* ── Micro contrast layer ─────────────────────────────────────────────
          Adds very subtle mid-tone density center-right.
          Gives presence and richness without adding visible color.           */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 65% at 75% 55%, rgba(75,45,30,0.06) 0%, rgba(75,45,30,0.018) 52%, transparent 74%)',
        }}
      />

      {/* ── Vignette ─────────────────────────────────────────────────────────
          Soft perimeter containment. Center fully open.                     */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 0%, transparent 46%, rgba(52,40,30,0.04) 74%, rgba(52,40,30,0.10) 100%)',
          zIndex: 5,
        }}
      />

      {/* ── Corner depth ─────────────────────────────────────────────────────
          Bottom-left and top-right — editorial framing, very restrained.    */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0% 100%, rgba(52,40,30,0.06) 0%, transparent 20%),
            radial-gradient(circle at 100% 0%, rgba(52,40,30,0.045) 0%, transparent 24%)
          `,
          zIndex: 6,
        }}
      />

      {/* ── Grain ────────────────────────────────────────────────────────────
          Integrates all layers into a single material surface.
          Removes digital flatness. Topmost layer.                           */}
      <div className="atmospheric-grain" aria-hidden="true" />
    </div>
  );
}
