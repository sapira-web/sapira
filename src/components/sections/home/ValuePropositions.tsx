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
    title: <>Operational memory<br />that stays</>,
    body: "When someone leaves, their knowledge doesn't. Pharo captures institutional context and makes it permanent.",
  },
  {
    id: '03',
    title: 'Processes that understand themselves',
    body: 'The system learns how your company actually operates. When conditions change, it adapts, because it understood in the first place.',
  },
];

const viewport = { once: true, amount: 0.18 } as const;

export default function ValuePropositions() {
  const shouldReduceMotion = useReducedMotion();

  function reveal(delay: number, opts: { y?: number; blur?: number; duration?: number } = {}) {
    const { y = 14, blur = 0, duration = 0.7 } = opts;
    if (shouldReduceMotion) {
      return { initial: { opacity: 0 }, whileInView: { opacity: 1 as const }, viewport, transition: { duration: 0.3 } };
    }
    return {
      initial: { opacity: 0, y, ...(blur ? { filter: `blur(${blur}px)` } : {}) },
      whileInView: { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) },
      viewport,
      transition: { duration, delay, ease: E },
    };
  }

  function element(
    colIndex: number,
    offset: number,
    opts: { y?: number; blur?: number; scale?: number; duration?: number } = {}
  ) {
    const { y = 28, blur = 8, duration = 0.9, scale } = opts;
    if (shouldReduceMotion) {
      return { initial: { opacity: 0 }, whileInView: { opacity: 1 as const }, viewport, transition: { duration: 0.3 } };
    }
    const initial: Record<string, number | string> = { opacity: 0, y, filter: `blur(${blur}px)` };
    const animate: Record<string, number | string> = { opacity: 1, y: 0, filter: 'blur(0px)' };
    if (scale !== undefined) { initial.scale = scale; animate.scale = 1; }
    return {
      initial,
      whileInView: animate,
      viewport,
      transition: { duration, delay: colIndex * 0.12 + offset, ease: E },
    };
  }

  return (
    <section style={{ backgroundColor: '#EFEBE6' }}>
      <div
        className="w-full px-8 md:px-14"
        style={{ paddingTop: '160px', paddingBottom: '160px' }}
      >

        {/* ── Eyebrow ──────────────────────────────────────────────── */}
        <motion.p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(73,72,72,0.50)',
            marginBottom: '24px',
          }}
          {...reveal(0, { y: 12, blur: 6, duration: 0.70 })}
        >
          Value Propositions
        </motion.p>

        {/* ── Title — brand statement landing with authority ────────── */}
        <motion.h2
          style={{
            fontSize: 'clamp(32px, 4vw, 62px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.032em',
            color: '#494848',
            maxWidth: '820px',
            marginBottom: '0',
          }}
          {...reveal(0.10, { y: 24, blur: 10, duration: 1.05 })}
        >
          Three things become possible<br />
          when <span style={{ color: '#C64444' }}>Pharo</span> runs your operations.
        </motion.h2>

        {/* ── Desktop grid ─────────────────────────────────────────── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr 1.15fr 1fr',
            marginTop: '96px',
          }}
        >
          {columns.map((col, i) => (
            // Outer: owns borders + transform only. No background change here to avoid render artifacts.
            <motion.div
              key={col.id}
              style={{
                position: 'relative',
                paddingTop: '48px',
                paddingRight: i < 2 ? '64px' : '0',
                paddingLeft: i > 0 ? '64px' : '0',
                borderTop: '1px solid rgba(73,72,72,0.10)',
                borderLeft: i > 0 ? '1px solid rgba(73,72,72,0.10)' : 'none',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              transition={{ duration: 0.32, ease: E }}
            >
              {/* Hover background — absolute layer behind content, never clips text */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: 'none',
                  backgroundColor: 'rgba(73,72,72,0)',
                }}
                whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(73,72,72,0.028)' }}
                transition={{ duration: 0.32, ease: E }}
              />

              {/* Content wrapper — always above background layer */}
              <div style={{ position: 'relative', zIndex: 1 }}>

              {/* Number — structural anchor */}
              <motion.p
                style={{
                  fontSize: 'clamp(80px, 8vw, 120px)',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  color: '#C64444',
                  opacity: 0.82,
                  marginBottom: '52px',
                  transformOrigin: 'left center',
                }}
                {...element(i, 0, { y: 20, blur: 4, scale: 0.96, duration: 0.85 })}
              >
                {col.id}
              </motion.p>

              {/* Block title */}
              <motion.h3
                style={{
                  fontSize: 'clamp(20px, 1.6vw, 26px)',
                  fontWeight: 500,
                  lineHeight: 1.22,
                  letterSpacing: '-0.022em',
                  color: '#494848',
                  marginBottom: '20px',
                }}
                {...element(i, 0.10, { y: 22, blur: 5, duration: 0.90 })}
              >
                {col.title}
              </motion.h3>

              {/* Body */}
              <motion.p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.68,
                  letterSpacing: '-0.008em',
                  color: 'rgba(73,72,72,0.68)',
                  maxWidth: '340px',
                }}
                {...element(i, 0.20, { y: 12, blur: 0, duration: 0.85 })}
              >
                {col.body}
              </motion.p>

              </div>{/* /content wrapper */}
            </motion.div>
          ))}
        </div>

        {/* ── Mobile ───────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-16" style={{ marginTop: '64px' }}>
          {columns.map((col, i) => (
            <div
              key={col.id}
              style={{ paddingTop: '32px', borderTop: '1px solid rgba(73,72,72,0.10)' }}
            >
              <motion.p
                style={{
                  fontSize: '72px', fontWeight: 400, lineHeight: 1,
                  letterSpacing: '-0.05em', color: '#C64444',
                  opacity: 0.82, marginBottom: '32px', transformOrigin: 'left center',
                }}
                {...element(i, 0, { y: 20, blur: 4, scale: 0.96, duration: 0.85 })}
              >
                {col.id}
              </motion.p>
              <motion.h3
                style={{
                  fontSize: '22px', fontWeight: 500, lineHeight: 1.22,
                  letterSpacing: '-0.022em', color: '#494848', marginBottom: '16px',
                }}
                {...element(i, 0.10, { y: 18, blur: 4, duration: 0.85 })}
              >
                {col.title}
              </motion.h3>
              <motion.p
                style={{ fontSize: '15px', lineHeight: 1.68, color: 'rgba(73,72,72,0.68)' }}
                {...element(i, 0.20, { y: 8, blur: 0, duration: 0.80 })}
              >
                {col.body}
              </motion.p>
            </div>
          ))}
        </div>

        {/* ── Closing divider ──────────────────────────────────────── */}
        <motion.div
          style={{ height: '1px', backgroundColor: 'rgba(73,72,72,0.10)', marginTop: '96px' }}
          {...reveal(0, { y: 0, duration: 0.55 })}
        />

      </div>
    </section>
  );
}
