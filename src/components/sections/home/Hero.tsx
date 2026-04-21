'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import AtmosphericBackground from './AtmosphericBackground';

// Single easing curve used everywhere — imperceptible start, ultra-smooth settle
const E = [0.18, 1, 0.32, 1] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven dissolve (runs after entry is long done)
  const textOpacity = useTransform(scrollYProgress, [0.14, 0.30], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textBlurNum = useTransform(
    scrollYProgress,
    [0.14, 0.21, 0.27, 0.32],
    shouldReduceMotion ? [0, 0, 0, 0] : [0, 1.5, 5, 14]
  );
  const textFilter = useMotionTemplate`blur(${textBlurNum}px)`;

  // Cinematic entry helper — GPU-only, no layout properties
  // Reduced motion: collapse to a simple short fade
  function enter(delay: number, duration: number, opts: {
    y?: number;
    blur?: number;
    scale?: number;
  } = {}) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25, delay: delay * 0.15 },
      };
    }
    const initial: Record<string, number | string> = { opacity: 0 };
    const animate: Record<string, number | string> = { opacity: 1 };
    if (opts.y)     { initial.y = opts.y;                        animate.y      = 0;           }
    if (opts.blur)  { initial.filter = `blur(${opts.blur}px)`;   animate.filter = 'blur(0px)'; }
    if (opts.scale) { initial.scale  = opts.scale;               animate.scale  = 1;           }
    return { initial, animate, transition: { duration, delay, ease: E } };
  }

  return (
    <section
      ref={heroRef}
      className="-mt-[68px]"
      style={{ height: '150vh', backgroundColor: '#EBE7E1' }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', zIndex: 1 }}
      >
        {/* ── Background settle — atmosphere breathes into place ──────────── */}
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? { opacity: 0.96 } : { scale: 1.02, opacity: 0.96 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: E }}
          style={{ willChange: 'transform, opacity' }}
        >
          <AtmosphericBackground />
        </motion.div>

        <div className="hero-noise absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true" />

        {/* ── Content — scroll-dissolves as image rises ───────────────────── */}
        <div className="relative z-10 h-full flex flex-col px-8 md:px-14 pt-[124px] md:pt-[148px]">
          <motion.div style={{ opacity: textOpacity, filter: textFilter }}>

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              style={{ willChange: 'transform, opacity' }}
              {...enter(0.30, 0.80, { y: 4 })}
            >
              <span className="inline-block w-8 h-[1px] bg-ignition shrink-0" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foundation/60">
                Operational Intelligence
              </span>
            </motion.div>

            {/* Headline — hero-headline on each span so background-clip: text is
                scoped to the element being animated, not a cross-layer parent */}
            <h1
              className="shrink-0 font-normal leading-[0.9]"
              style={{ fontSize: 'clamp(36px, 5.8vw, 78px)', letterSpacing: '-0.04em', marginBottom: 'calc(var(--spacing) * 5)' }}
            >
              <motion.span
                className="hero-headline block"
                {...enter(0.44, 1.15, { y: 8 })}
              >
                Your company runs on knowledge
              </motion.span>
              <motion.span
                className="hero-headline block"
                {...enter(0.57, 1.15, { y: 8 })}
              >
                that lives in people&apos;s heads.
              </motion.span>
              <motion.span
                className="hero-headline block"
                {...enter(0.70, 1.15, { y: 8 })}
              >
                We turn it into infrastructure<motion.span
                  className="hero-headline-period inline-block"
                  {...enter(0.88, 0.70, { y: 3 })}
                >.</motion.span>
              </motion.span>
            </h1>

            {/* Body + CTAs */}
            <div className="shrink-0 flex flex-col gap-8 mb-8 md:mb-10 md:max-w-[480px]">
              <motion.p
                style={{
                  fontSize: '18px', lineHeight: '1.5', letterSpacing: '-0.01em',
                  color: 'rgba(73,72,72,0.70)', willChange: 'transform, opacity',
                }}
                {...enter(0.82, 1.05, { y: 7, blur: 4 })}
              >
                Sapira deploys bespoke AI systems that capture how your business actually operates,
                for European enterprises that have outgrown what any software was built to handle.
              </motion.p>

              <motion.div
                className="flex flex-row items-center gap-4"
                style={{ willChange: 'transform, opacity' }}
                {...enter(0.98, 0.90, { y: 5, scale: 0.99 })}
              >
                <a
                  href="#contact"
                  data-cursor-label="GO"
                  className="group inline-flex items-center gap-3 bg-oxide text-rational px-7 py-4 rounded-[2px] transition-colors duration-300 hover:bg-[#6a3635]"
                >
                  <span className="text-[13px] font-medium tracking-[0.02em] uppercase">
                    See it on your data
                  </span>
                  <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="/pharo"
                  data-cursor-label="VIEW"
                  className="group inline-flex items-center gap-3 border border-foundation/40 text-foundation px-7 py-4 rounded-[2px] transition-colors duration-300 hover:border-foundation/80"
                >
                  <span className="text-[13px] font-medium tracking-[0.02em] uppercase">
                    Discover Pharo
                  </span>
                  <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-10 left-12 hidden md:block z-20"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            className="flex flex-col items-start gap-3"
            {...enter(1.35, 0.80)}
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-foundation/45">
              Scroll
            </span>
            <div className="relative w-[1px] h-10 bg-foundation/20 overflow-hidden">
              <motion.div
                className="absolute left-0 w-full h-[12px] bg-ignition"
                initial={{ y: -12 }}
                animate={{ y: [-12, 40] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
