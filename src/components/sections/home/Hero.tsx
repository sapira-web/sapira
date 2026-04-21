'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import AtmosphericBackground from './AtmosphericBackground';
import SystemVisual from './SystemVisual';
import { PrimaryCTA, SecondaryCTA } from '@/components/ui/CTAs';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // ── Scroll-linked text choreography ──────────────────────────────────────
  // scrollYProgress: 0 = hero top at viewport top, 1 = hero bottom at viewport top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.60], [1, 0]);
  const textBlurNum = useTransform(
    scrollYProgress,
    [0.15, 0.60],
    [0, shouldReduceMotion ? 0 : 10]
  );
  const textFilter  = useMotionTemplate`blur(${textBlurNum}px)`;
  const textY       = useTransform(
    scrollYProgress,
    [0.15, 0.60],
    [0, shouldReduceMotion ? 0 : -14]
  );

  // ── Entrance animation factory ────────────────────────────────────────────
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
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden -mt-[68px]"
      style={{ backgroundColor: '#EBE7E1' }}
    >
      <AtmosphericBackground />

      {/* Noise — sits above background, below content */}
      <div className="hero-noise absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true" />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col px-8 md:px-14 pt-[124px] md:pt-[148px] min-h-0">

        {/* Text block — scroll-linked fade + blur */}
        <motion.div style={{ opacity: textOpacity, filter: textFilter, y: textY }}>

          {/* Eyebrow */}
          <motion.p
            className="shrink-0 text-[12px] uppercase mb-5 md:mb-4"
            style={{ letterSpacing: '0.18em', color: '#494848' }}
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
            className="shrink-0 flex flex-col gap-8 mb-8 md:mb-10 md:max-w-[480px]"
            {...entry(0.24)}
          >
            <p style={{ fontSize: '18px', lineHeight: '1.5', letterSpacing: '-0.01em', color: 'rgba(73,72,72,0.70)' }}>
              Sapira deploys bespoke AI systems that capture how your business actually operates, for European enterprises that have outgrown what any software was built to handle.
            </p>

            <div className="flex flex-row items-center gap-4">
              <PrimaryCTA href="#contact">See it on your data</PrimaryCTA>
              <SecondaryCTA href="/pharo">Discover Pharo</SecondaryCTA>
            </div>
          </motion.div>

        </motion.div>

        {/* Visual — full-width, not scroll-animated */}
        <motion.div
          className=""
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
