'use client';

import { motion, useReducedMotion } from 'framer-motion';

const E = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    id: '01',
    title: 'Coordination becomes infrastructure',
    body: 'Cross-department processes run end to end — automatically. People stop being the system and start making decisions.',
  },
  {
    id: '02',
    title: 'Operational memory that stays',
    body: "When someone leaves, their knowledge doesn't. Pharo captures institutional context and makes it permanent.",
  },
  {
    id: '03',
    title: 'Processes that understand themselves',
    body: 'The system learns how your company actually operates. When conditions change, it adapts — because it understood in the first place.',
  },
];

export default function ValuePropositions() {
  const shouldReduceMotion = useReducedMotion();

  function reveal(delay: number) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 as const },
        viewport: { once: true },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 as const },
      transition: { duration: 0.7, delay, ease: E },
    };
  }

  function col(i: number) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 as const },
        viewport: { once: true },
        transition: { duration: 0.3 },
      };
    }
    return {
      initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
      whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
      viewport: { once: true, amount: 0.15 as const },
      transition: { duration: 0.85, delay: i * 0.12, ease: E },
    };
  }

  return (
    <section style={{ backgroundColor: '#EFEBE6' }}>
      <div className="max-w-[1360px] mx-auto px-8 md:px-14 py-[140px]">

        {/* ── Top: left (eyebrow + title) / right (paragraph) ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20" style={{ marginBottom: '88px' }}>

          {/* Left */}
          <div>
            <motion.p
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(73,72,72,0.60)',
                marginBottom: '32px',
              }}
              {...reveal(0)}
            >
              Value Propositions
            </motion.p>

            <motion.h2
              style={{
                fontSize: 'clamp(30px, 3.2vw, 54px)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#494848',
                maxWidth: '500px',
              }}
              {...reveal(0.08)}
            >
              Three things become possible when{' '}
              <span style={{ color: '#562B2A' }}>Pharo</span>{' '}
              runs your operations.
            </motion.h2>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <motion.p
              style={{
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'rgba(73,72,72,0.70)',
                maxWidth: '420px',
              }}
              {...reveal(0.18)}
            >
              What your company already knows — the coordination, the judgment,
              the operational memory — becomes infrastructure. Built bespoke,
              deployed in weeks, running at scale.
            </motion.p>
          </div>

        </div>

        {/* ── Section divider ──────────────────────────────────────── */}
        <div style={{ height: '1px', backgroundColor: 'rgba(73,72,72,0.08)', marginBottom: '64px' }} />

        {/* ── Three columns ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {columns.map((item, i) => (
            <motion.div
              key={item.id}
              className="group"
              style={{
                paddingTop: '8px',
                paddingRight: i < 2 ? '48px' : '0',
                paddingLeft: i > 0 ? '48px' : '0',
                paddingBottom: i < 2 ? '64px' : '0',
                borderLeft: i > 0 ? '1px solid rgba(73,72,72,0.08)' : 'none',
                borderTop: i > 0 ? 'none' : 'none',
                cursor: 'default',
              }}
              {...col(i)}
              whileHover={shouldReduceMotion ? undefined : {
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
            >
              {/* Number */}
              <p
                className="font-normal transition-colors duration-200"
                style={{
                  fontSize: '56px',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '28px',
                  opacity: 0.9,
                  color: '#C64444',
                }}
              >
                <span className="group-hover:text-[#B53A3A] transition-colors duration-200 inline-block" style={{ color: 'inherit' }}>
                  {item.id}
                </span>
              </p>

              {/* Column title */}
              <h3
                style={{
                  fontSize: '21px',
                  fontWeight: 500,
                  lineHeight: 1.28,
                  letterSpacing: '-0.02em',
                  color: '#494848',
                  marginBottom: '14px',
                }}
              >
                {item.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.68,
                  color: 'rgba(73,72,72,0.75)',
                  maxWidth: '320px',
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
