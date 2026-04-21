'use client';

import { motion, useReducedMotion } from 'framer-motion';

/*
 * IMAGE DIRECTION (for when a real photograph is available):
 *
 * Replace this component with a full-bleed <Image /> using:
 * → Architectural interior — structural concrete, precision engineering
 * → Industrial facility corridor — clean, precise, controlled lighting
 * → Material macro — polished metal plate, architectural glass facade
 *
 * Tone:     warm neutral, single directional light, no people, no screens
 * Ratio:    ~4:1 wide cinematic
 * Treatment: subtle warm grade, not desaturated
 *
 * Until then, this SVG architectural composition serves as the placeholder
 * and communicates the visual direction to the production team.
 */

// ── Coordinate space: 1440 × 380 ───────────────────────────────────────────
// preserveAspectRatio="xMidYMid slice" fills the container,
// cropping symmetrically. Keep critical elements away from edges.

const VW = 1440;
const VH = 380;

// Structural zones — three architectural bays
const ZONES = [
  { x: 60,   y: 68,  w: 390, h: 244 }, // left bay
  { x: 486,  y: 44,  w: 468, h: 292 }, // center bay (widest — coordination)
  { x: 990,  y: 72,  w: 390, h: 236 }, // right bay
];

// Primary horizontal axis — the spine
const AXIS_Y = 190;

// Module grid — columns every 144px, rows every 76px
const GRID_COLS = Array.from({ length: 9 },  (_, i) => (i + 1) * 144);
const GRID_ROWS = Array.from({ length: 4 },  (_, i) => (i + 1) * 76);

// Structural nodes along the axis
const NODES = [
  { x: 57,   critical: false },
  { x: 255,  critical: false },
  { x: 483,  critical: false },
  { x: 720,  critical: true  }, // coordination point
  { x: 957,  critical: false },
  { x: 1383, critical: false },
];

export default function SystemVisual() {
  const r = useReducedMotion();

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Top edge — very thin separator */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: '1px', background: 'rgba(73,72,72,0.09)' }}
      />

      {/* Gradient fade — seamless transition from hero text above */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{
          height: '48px',
          background: 'linear-gradient(to bottom, var(--color-rational) 0%, transparent 100%)',
        }}
      />

      {/* SVG composition */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: r ? 0 : 1.0, delay: r ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Ambient light from upper-left — warm interior feel */}
            <radialGradient id="sv-ambient" cx="28%" cy="18%" r="78%">
              <stop offset="0%"   stopColor="#F7F3EE" />
              <stop offset="55%"  stopColor="#EFEBE6" />
              <stop offset="100%" stopColor="#E5E0D8" />
            </radialGradient>

            {/* Left plane — warm shadow */}
            <linearGradient id="sv-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(73,72,72,0.055)" />
              <stop offset="100%" stopColor="rgba(73,72,72,0.005)" />
            </linearGradient>

            {/* Center plane — slightly more material */}
            <linearGradient id="sv-center" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(73,72,72,0.035)" />
              <stop offset="100%" stopColor="rgba(73,72,72,0.065)" />
            </linearGradient>

            {/* Right plane */}
            <linearGradient id="sv-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(73,72,72,0.04)" />
              <stop offset="100%" stopColor="rgba(73,72,72,0)" />
            </linearGradient>
          </defs>

          {/* ── Base ──────────────────────────────────────────────────── */}
          <rect width={VW} height={VH} fill="url(#sv-ambient)" />

          {/* ── Background planes (material surfaces) ─────────────────── */}
          <rect x={0}    y={0} width={630}  height={VH} fill="url(#sv-left)"   />
          <rect x={486}  y={0} width={468}  height={VH} fill="url(#sv-center)" />
          <rect x={900}  y={0} width={540}  height={VH} fill="url(#sv-right)"  />

          {/* ── Module grid (engineering substrate) ───────────────────── */}
          {GRID_COLS.map(x => (
            <line key={`gc${x}`}
              x1={x} y1={0} x2={x} y2={VH}
              stroke="rgba(73,72,72,0.042)" strokeWidth="0.5"
            />
          ))}
          {GRID_ROWS.map(y => (
            <line key={`gr${y}`}
              x1={0} y1={y} x2={VW} y2={y}
              stroke="rgba(73,72,72,0.036)" strokeWidth="0.5"
            />
          ))}

          {/* ── Structural zone outlines (architectural bays) ──────────── */}
          {ZONES.map((z, i) => (
            <rect key={`z${i}`}
              x={z.x} y={z.y} width={z.w} height={z.h}
              fill="none"
              stroke={`rgba(73,72,72,${[0.10, 0.13, 0.09][i]})`}
              strokeWidth="0.75"
            />
          ))}

          {/* ── Internal divisions within center zone ─────────────────── */}
          <line x1={630} y1={44}  x2={630} y2={336}
            stroke="rgba(73,72,72,0.07)" strokeWidth="0.5" />
          <line x1={810} y1={44}  x2={810} y2={336}
            stroke="rgba(73,72,72,0.07)" strokeWidth="0.5" />

          {/* ── Primary structural axis (horizontal spine) ─────────────── */}
          <line x1={0} y1={AXIS_Y} x2={VW} y2={AXIS_Y}
            stroke="rgba(73,72,72,0.095)" strokeWidth="1" />

          {/* ── Zone boundary verticals ────────────────────────────────── */}
          <line x1={486}  y1={0} x2={486}  y2={VH}
            stroke="rgba(73,72,72,0.075)" strokeWidth="0.75" />
          <line x1={954}  y1={0} x2={954}  y2={VH}
            stroke="rgba(73,72,72,0.075)" strokeWidth="0.75" />

          {/* ── Structural nodes along axis ────────────────────────────── */}
          {NODES.map((n, i) => (
            <motion.rect
              key={`n${i}`}
              x={n.x - 3} y={AXIS_Y - 3}
              width={6} height={6} rx={0.5}
              fill={n.critical ? '#C64444' : 'rgba(73,72,72,0.26)'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={r
                ? { duration: 0 }
                : { duration: 0.4, delay: 0.8 + i * 0.07 }
              }
            />
          ))}

          {/* ── Critical node accent marks (top + bottom tick) ─────────── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={r ? { duration: 0 } : { duration: 0.4, delay: 1.2 }}
          >
            <line x1={720} y1={AXIS_Y - 10} x2={720} y2={AXIS_Y - 5}
              stroke="#C64444" strokeWidth="0.75" strokeOpacity="0.55" />
            <line x1={720} y1={AXIS_Y + 5}  x2={720} y2={AXIS_Y + 10}
              stroke="#C64444" strokeWidth="0.75" strokeOpacity="0.55" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
