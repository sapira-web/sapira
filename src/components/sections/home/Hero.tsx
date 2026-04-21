'use client';

import { motion, useReducedMotion } from 'framer-motion';
import AtmosphericBackground from './AtmosphericBackground';
import SystemVisual from './SystemVisual';
import { PrimaryCTA, SecondaryCTA } from '@/components/ui/CTAs';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    animate:  { opacity: 1, y: 0 },
    transition: {
      duration:  shouldReduceMotion ? 0.2 : 0.65,
      delay:     shouldReduceMotion ? 0   : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#EBE7E1' }}
    >
      <AtmosphericBackground />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col px-8 md:px-14 pt-14 md:pt-20 min-h-0">

        {/* Eyebrow */}
        <motion.p
          className="shrink-0 text-[12px] uppercase mb-5 md:mb-7"
          style={{ letterSpacing: '0.18em', color: 'rgba(73,72,72,0.52)' }}
          {...entry(0.07)}
        >
          Operational Intelligence
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="hero-headline shrink-0 font-normal leading-[1.03]"
          style={{ fontSize: 'clamp(36px, 5.8vw, 78px)', letterSpacing: '-0.04em', marginBottom: 'calc(var(--spacing) * 5)' }}
          {...entry(0.14)}
        >
          Your company runs on knowledge
          <br className="hidden md:block" />{' '}
          that lives in people's heads.
          <br />
          We turn it into infrastructure
          <span className="hero-headline-period">.</span>
        </motion.h1>

        {/* Supporting copy + CTA */}
        <motion.div
          className="shrink-0 flex flex-col gap-6 mb-8 md:mb-10 md:max-w-[480px]"
          {...entry(0.24)}
        >
          <p style={{ fontSize: '16px', lineHeight: '1.74', letterSpacing: '-0.01em', color: 'rgba(73,72,72,0.70)' }}>
            Sapira deploys bespoke AI systems that capture how your business actually operates, for European enterprises that have outgrown what any software was built to handle.
          </p>

          <div className="flex flex-row items-center gap-4">
            <PrimaryCTA href="#contact">See it on your data</PrimaryCTA>
            <SecondaryCTA href="/pharo">Discover Pharo</SecondaryCTA>
          </div>
        </motion.div>

        {/* Visual — full-width, breaks out of container padding */}
        <motion.div
          className="flex-1 min-h-[38vh] -mx-8 md:-mx-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.75,
            delay:    shouldReduceMotion ? 0   : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SystemVisual />
        </motion.div>
      </div>
    </section>
  );
}
