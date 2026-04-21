'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import AtmosphericBackground from './AtmosphericBackground';
import { PrimaryCTA, SecondaryCTA } from '@/components/ui/CTAs';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // scrollYProgress: 0 → 1 over 200vh section height
  // sticky frame releases at scroll = 100vh → scrollYProgress ≈ 0.50
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Dissolve completes at 0.44 — invisible before the sticky snaps at 0.50
  const textOpacity = useTransform(scrollYProgress, [0.18, 0.44], [1, 0]);
  const textBlurNum = useTransform(
    scrollYProgress,
    [0.18, 0.44],
    [0, shouldReduceMotion ? 0 : 14]
  );
  const textFilter = useMotionTemplate`blur(${textBlurNum}px)`;

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.65,
      delay:    shouldReduceMotion ? 0   : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      ref={heroRef}
      className="-mt-[68px]"
      style={{ height: '200vh', backgroundColor: '#EBE7E1' }}
    >
      {/* Sticky frame — pinned for 100vh of scroll room, then releases naturally */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', zIndex: 1 }}
      >
        <AtmosphericBackground />
        <div className="hero-noise absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true" />

        <div className="relative z-10 h-full flex flex-col px-8 md:px-14 pt-[124px] md:pt-[148px]">

          {/* Content — dissolves as image rises */}
          <motion.div style={{ opacity: textOpacity, filter: textFilter }}>

            <motion.p
              className="shrink-0 text-[12px] uppercase mb-5 md:mb-4"
              style={{ letterSpacing: '0.18em', color: '#494848' }}
              {...entry(0.07)}
            >
              Operational Intelligence
            </motion.p>

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

        </div>
      </div>
    </section>
  );
}
