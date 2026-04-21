'use client';

import { motion, useReducedMotion } from 'framer-motion';
const E = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    id: '01',
    title: 'Coordination becomes infrastructure',
    body: 'Cross-department processes run end to end, automatically. People stop being the system and start making decisions.',
  },
  {
    id: '02',
    title: 'Operational memory that stays',
    body: "When someone leaves, their knowledge doesn't. Pharo captures institutional context and makes it permanent.",
  },
  {
    id: '03',
    title: 'Processes that understand themselves',
    body: 'The system learns how your company actually operates. When conditions change, it adapts, because it understood in the first place.',
  },
];

export default function ValuePropositions() {
  const shouldReduceMotion = useReducedMotion();

  function reveal(delay: number, opts: { y?: number; blur?: number; duration?: number } = {}) {
    const { y = 14, blur = 0, duration = 0.7 } = opts;
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 as const },
        viewport: { once: true },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y, ...(blur ? { filter: `blur(${blur}px)` } : {}) },
      whileInView: { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) },
      viewport: { once: true, amount: 0.25 as const },
      transition: { duration, delay, ease: E },
    };
  }

  // colIndex × 120ms stagger + per-element offset within the column
  function element(colIndex: number, offset: number, opts: { y?: number; blur?: number; duration?: number } = {}) {
    const { y = 32, blur = 8, duration = 0.9 } = opts;
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 as const },
        viewport: { once: true },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y, filter: `blur(${blur}px)` },
      whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
      viewport: { once: true, amount: 0.1 as const },
      transition: { duration, delay: colIndex * 0.12 + offset, ease: E },
    };
  }

  return (
    <section style={{ backgroundColor: '#EFEBE6' }}>
      <div
        className="w-full px-8 md:px-14"
        style={{ paddingTop: '160px', paddingBottom: '160px' }}
      >

        {/* ── Eyebrow + Monumental title ───────────────────────────── */}
        <div style={{ marginBottom: '96px' }}>

          <motion.p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(73,72,72,0.55)',
              marginBottom: '24px',
            }}
            {...reveal(0, { y: 8, duration: 0.55 })}
          >
            Value Propositions
          </motion.p>

          <motion.h2
            style={{
              fontSize: 'clamp(34px, 4.2vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#494848',
              maxWidth: '1040px',
            }}
            {...reveal(0.09, { y: 28, blur: 8, duration: 1.05 })}
          >
            Three things become possible when <span style={{ color: '#C64444' }}>Pharo</span> runs your operations.
          </motion.h2>

        </div>

        {/* ── Horizontal divider ───────────────────────────────────── */}
        <motion.div
          style={{ height: '1px', backgroundColor: 'rgba(73,72,72,0.10)', marginBottom: '80px' }}
          {...reveal(0.22, { y: 0, duration: 0.55 })}
        />

        {/* ── Three editorial columns ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {columns.map((col, i) => (
            <div
              key={col.id}
              className={i < 2 ? 'pb-16 md:pb-0' : ''}
              style={{
                paddingTop: '4px',
                paddingRight: i < 2 ? '60px' : '0',
                paddingLeft: i > 0 ? '60px' : '0',
                borderLeft: i > 0 ? '1px solid rgba(73,72,72,0.10)' : 'none',
              }}
            >
              {/* Number — editorial anchor */}
              <motion.p
                style={{
                  fontSize: '88px',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#C64444',
                  opacity: 0.9,
                  marginBottom: '44px',
                }}
                {...element(i, 0, { y: 20, blur: 6, duration: 0.85 })}
              >
                {col.id}
              </motion.p>

              {/* Column title */}
              <motion.h3
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: '-0.025em',
                  color: '#494848',
                  marginBottom: '20px',
                }}
                {...element(i, 0.08, { y: 18, blur: 4, duration: 0.85 })}
              >
                {col.title}
              </motion.h3>

              {/* Body */}
              <motion.p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.62,
                  color: 'rgba(73,72,72,0.72)',
                  maxWidth: '300px',
                }}
                {...element(i, 0.16, { y: 12, blur: 0, duration: 0.8 })}
              >
                {col.body}
              </motion.p>

            </div>
          ))}
        </div>

        {/* ── Closing divider ──────────────────────────────────────── */}
        <motion.div
          style={{ height: '1px', backgroundColor: 'rgba(73,72,72,0.10)', marginTop: '80px' }}
          {...reveal(0, { y: 0, duration: 0.55 })}
        />

      </div>

    </section>
  );
}
