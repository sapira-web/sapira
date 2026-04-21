'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function EditorialImagePanel() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Calibrated for MacBook viewport (~900px):
  // — image enters viewport bottom at scroll ~600px (hero content mid-dissolve)
  // — image dominates upper viewport by sticky release (~900px scroll)
  const imageY = useTransform(
    scrollY,
    [0, 1400],
    [0, shouldReduceMotion ? 0 : -700]
  );

  return (
    <motion.section
      className="relative w-full"
      style={{ zIndex: 15, marginBottom: imageY }}
    >
      <motion.div
        className="relative w-full"
        style={{ y: imageY }}
      >
        <Image
          src="/images/sapira_1.png"
          alt="Sapira operational intelligence platform"
          width={1702}
          height={924}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(30,22,20,0.28) 0%, transparent 32%)',
          }}
          aria-hidden="true"
        />

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
    </motion.section>
  );
}
