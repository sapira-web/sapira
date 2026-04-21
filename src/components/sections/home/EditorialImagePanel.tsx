'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function EditorialImagePanel() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 650], [0, shouldReduceMotion ? 0 : -90]);

  return (
    <section
      className="relative w-full pb-20 md:pb-28"
      style={{ marginTop: '-64px', zIndex: 15 }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: '0px',
          aspectRatio: '16 / 7',
          minHeight: '300px',
          y: imageY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.95,
          delay: shouldReduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="/images/sapira_1.png"
          alt="Sapira operational intelligence platform"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        {/* Dark gradient overlay — bottom, for label readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(30,22,20,0.52) 0%, rgba(30,22,20,0.18) 32%, transparent 58%)',
          }}
          aria-hidden="true"
        />

        {/* Grain — same system as hero */}
        <div className="atmospheric-grain" aria-hidden="true" />

        {/* Bottom-left label */}
        <div className="absolute bottom-7 left-9 flex flex-col gap-[10px]" aria-hidden="true">
          <p style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,252,249,0.52)',
            margin: 0,
          }}>
            Pharo — Operational Intelligence
          </p>
          <div style={{
            width: '20px',
            height: '1px',
            backgroundColor: 'rgba(198,68,68,0.55)',
          }} />
        </div>

        {/* Top-right index */}
        <p
          className="absolute top-6 right-8"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,252,249,0.32)',
            margin: 0,
          }}
          aria-hidden="true"
        >
          01
        </p>

      </motion.div>
    </section>
  );
}
