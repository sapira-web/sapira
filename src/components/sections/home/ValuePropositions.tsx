'use client';

import { motion, useReducedMotion } from 'framer-motion';

// ── Visualizations ────────────────────────────────────────────────────────

function Viz1() {
  return (
    <svg
      viewBox="0 0 280 140"
      className="w-full max-w-[280px] h-auto viz-breathe"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      {Array.from({ length: 14 }, (_, row) =>
        Array.from({ length: 28 }, (_, col) => {
          const x = col * 10 + 5;
          const baseY = row * 10 + 5;
          const wave = Math.sin((col / 28) * Math.PI * 2 + row * 0.15) * 2;
          const y = baseY + wave;
          const opacity = 0.3 + (row / 14) * 0.5;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r="1"
              fill="#EFEBE6"
              opacity={opacity}
            />
          );
        })
      )}
      <line x1="0" y1="90" x2="280" y2="60" stroke="#C64444" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}

function Viz2() {
  return (
    <svg
      viewBox="0 0 280 140"
      className="w-full max-w-[280px] h-auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <g className="viz-rotate">
        {Array.from({ length: 80 }, (_, i) => {
          const angle = i * 0.3;
          const radius = 3 + i * 0.7;
          const x = 140 + Math.cos(angle) * radius;
          const y = 70 + Math.sin(angle) * radius * 0.5;
          const opacity = 0.25 + (i / 80) * 0.65;
          return (
            <circle key={i} cx={x} cy={y} r="1.3" fill="#EFEBE6" opacity={opacity} />
          );
        })}
      </g>
      <circle cx="140" cy="70" r="3" fill="#C64444" />
    </svg>
  );
}

function Viz3() {
  const nodes = [
    { x: 40, y: 30 }, { x: 90, y: 70 }, { x: 140, y: 40 },
    { x: 200, y: 80 }, { x: 240, y: 30 }, { x: 60, y: 100 },
    { x: 170, y: 110 }, { x: 110, y: 20 }, { x: 220, y: 115 },
  ];
  return (
    <svg
      viewBox="0 0 280 140"
      className="w-full max-w-[280px] h-auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="2" fill="#494848" opacity="0.7" />
      ))}
      <g stroke="#494848" strokeWidth="0.5" opacity="0.25" fill="none">
        <line x1="40" y1="30" x2="90" y2="70" />
        <line x1="90" y1="70" x2="140" y2="40" />
        <line x1="140" y1="40" x2="200" y2="80" />
        <line x1="200" y1="80" x2="240" y2="30" />
        <line x1="60" y1="100" x2="90" y2="70" />
        <line x1="170" y1="110" x2="200" y2="80" />
        <line x1="110" y1="20" x2="140" y2="40" />
        <line x1="110" y1="20" x2="40" y2="30" />
        <line x1="220" y1="115" x2="200" y2="80" />
        <line x1="170" y1="110" x2="140" y2="40" />
      </g>
      <circle cx="140" cy="40" r="3" fill="#C64444" className="viz-pulse" />
    </svg>
  );
}

// ── Card data ─────────────────────────────────────────────────────────────

const cardData = [
  {
    id: 'vp-1',
    number: '01 / 03',
    title: 'Coordination becomes infrastructure.',
    description:
      'Cross-department processes run end to end, automatically. People stop being the system — they start making decisions.',
    bg: '#494848',
    titleColor: '#EFEBE6',
    descColor: 'rgba(239,235,230,0.75)',
    numberColor: '#C64444',
    borderLeft: false,
  },
  {
    id: 'vp-2',
    number: '02 / 03',
    title: 'Operational memory that stays.',
    description:
      "When someone leaves, their knowledge doesn't. Pharo captures institutional context and makes it permanent.",
    bg: '#562B2A',
    titleColor: '#EFEBE6',
    descColor: 'rgba(239,235,230,0.75)',
    numberColor: '#C64444',
    borderLeft: false,
  },
  {
    id: 'vp-3',
    number: '03 / 03',
    title: 'Processes that understand themselves.',
    description:
      'The system learns how your company actually operates. When conditions change, it adapts — because it understood in the first place.',
    bg: '#EFEBE6',
    titleColor: '#494848',
    descColor: 'rgba(73,72,72,0.72)',
    numberColor: '#C64444',
    borderLeft: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────

export default function ValuePropositions() {
  const shouldReduceMotion = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  });

  const slideUp = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const cardAnim = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="w-full">

      {/* ── Bloque A — Intro ───────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#EFEBE6' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[120px] pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Left — eyebrow + title */}
            <div className="col-span-12 md:col-span-6">
              <motion.p
                className="font-medium uppercase mb-8"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  color: 'rgba(73,72,72,0.55)',
                }}
                {...fade(0)}
              >
                (WHY SAPIRA)
              </motion.p>

              <motion.h2
                className="font-normal"
                style={{
                  fontSize: 'clamp(36px, 3.6vw, 52px)',
                  lineHeight: '1.08',
                  letterSpacing: '-0.03em',
                  color: '#494848',
                  maxWidth: '480px',
                }}
                {...slideUp(0.1)}
              >
                Three things become possible when{' '}
                <span style={{ color: '#562B2A' }}>Pharo</span>{' '}
                runs your operations.
              </motion.h2>
            </div>

            {/* Right — description + CTA */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-12">
              <motion.p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.5',
                  color: 'rgba(73,72,72,0.72)',
                  maxWidth: '460px',
                }}
                {...slideUp(0.25)}
              >
                What your company already knows — the coordination, the judgment, the operational memory — becomes infrastructure. Built bespoke, deployed in weeks, running at scale.
              </motion.p>

              <motion.div {...fade(0.4)}>
                <a
                  href="/pharo"
                  className="group inline-flex items-center gap-4 px-4 py-4 relative w-fit"
                  aria-label="Discover how Pharo works"
                >
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foundation/70 transition-all duration-200 ease-out group-hover:w-4 group-hover:h-4" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-foundation/70 transition-all duration-200 ease-out group-hover:w-4 group-hover:h-4" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foundation/70 transition-all duration-200 ease-out group-hover:w-4 group-hover:h-4" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foundation/70 transition-all duration-200 ease-out group-hover:w-4 group-hover:h-4" />
                  <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-foundation transition-colors duration-200 ease-out group-hover:text-ignition">
                    Discover Pharo
                  </span>
                  <span className="text-foundation transition-colors duration-200 ease-out group-hover:text-ignition">
                    →
                  </span>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bloque B — Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        {cardData.map((card, i) => (
          <motion.article
            key={card.id}
            aria-labelledby={`${card.id}-title`}
            className="relative overflow-hidden flex flex-col justify-between px-10 py-20 md:py-10 md:h-[620px]"
            style={{
              backgroundColor: card.bg,
              ...(card.borderLeft ? { borderLeft: '1px solid rgba(73,72,72,0.10)' } : {}),
            }}
            {...cardAnim(i * 0.15)}
          >
            {/* Top — title */}
            <h3
              id={`${card.id}-title`}
              className="font-normal"
              style={{
                fontSize: '28px',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                color: card.titleColor,
                maxWidth: '280px',
              }}
            >
              {card.title}
            </h3>

            {/* Center — visualization */}
            <div className="flex justify-center py-6" aria-hidden="true">
              {i === 0 ? <Viz1 /> : i === 1 ? <Viz2 /> : <Viz3 />}
            </div>

            {/* Bottom — number + description */}
            <div className="flex flex-col gap-4">
              <p
                className="font-medium uppercase"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  color: card.numberColor,
                }}
              >
                {card.number}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.55',
                  color: card.descColor,
                  maxWidth: '320px',
                }}
              >
                {card.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

    </section>
  );
}
