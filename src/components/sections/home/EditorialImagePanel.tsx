'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, easeOut } from 'framer-motion';

export default function EditorialImagePanel() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Primary parallax — negative start so image enters viewport mid-hero-dissolve
  const imageY = useTransform(
    scrollY,
    [0, 1400],
    [shouldReduceMotion ? 0 : -160, shouldReduceMotion ? 0 : -700]
  );

  // Scale + blur settle (image arrives scaled up, settles to 1)
  const imageScale = useTransform(
    scrollY,
    [200, 1400],
    [shouldReduceMotion ? 1 : 1.18, 1],
    { ease: easeOut }
  );
  const imageBlurRaw = useTransform(
    scrollY,
    [200, 1400],
    [shouldReduceMotion ? 0 : 1.2, 0],
    { ease: easeOut }
  );
  const imageFilter = useTransform(imageBlurRaw, (v) => `blur(${v}px)`);

  // Depth settle — wrapper drifts down slightly as image stabilises (GPU: transform only)
  const settleY = useTransform(
    scrollY,
    [200, 1100],
    [shouldReduceMotion ? 0 : -8, 0],
    { ease: easeOut }
  );

  // Aura breathes out as image settles
  const auraOpacity = useTransform(scrollY, [200, 1000], [0.85, 0.48]);
  const auraScale   = useTransform(scrollY, [200, 1000], [1.05, 1.00]);

  return (
    <motion.section
      className="relative w-full"
      style={{ zIndex: 15, marginBottom: imageY }}
    >
      {/* Primary parallax layer — no overflow:hidden here */}
      <motion.div className="relative w-full" style={{ y: imageY }}>

        {/* Warm aura behind image — scroll-driven opacity + scale, GPU only */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-40px',
            zIndex: 0,
            background: 'radial-gradient(ellipse at center, rgba(86,43,42,0.14) 0%, rgba(86,43,42,0.06) 48%, transparent 72%)',
            filter: 'blur(48px)',
            pointerEvents: 'none',
            opacity: auraOpacity,
            scale: auraScale,
            transformOrigin: 'center center',
          }}
        />

        {/* Settle wrapper — micro y-drift as depth stabilises */}
        <motion.div className="relative w-full" style={{ y: settleY, zIndex: 1 }}>

          {/* overflow:hidden + static warm shadow
              Box-shadow renders outside the element — not clipped by overflow:hidden */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: '0',
              boxShadow:
                '0 8px 18px rgba(86,43,42,0.10), 0 24px 48px rgba(86,43,42,0.08), 0 60px 90px rgba(86,43,42,0.05)',
            }}
          >
            {/* Scale + blur layer */}
            <motion.div
              style={{
                scale: imageScale,
                filter: imageFilter,
                transformOrigin: 'center center',
                willChange: 'transform, filter',
              }}
            >
              <Image
                src="/images/sapira_1.png"
                alt="Sapira operational intelligence platform"
                width={1702}
                height={924}
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.02)' }}
                priority
              />
            </motion.div>

            {/* Bottom gradient vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(30,22,20,0.28) 0%, transparent 32%)',
              }}
              aria-hidden="true"
            />

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
          </div>

        </motion.div>
      </motion.div>
    </motion.section>
  );
}
