'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, easeOut } from 'framer-motion';

export default function EditorialImagePanel() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Calibrated for MacBook viewport (~900px):
  // — image enters viewport bottom at scroll ~600px (hero content mid-dissolve)
  // — image dominates upper viewport by sticky release (~900px scroll)
  // Negative start pulls image above its natural DOM position so it enters
  // the viewport mid-hero-dissolve (~scroll 290px) instead of after hero releases.
  const imageY = useTransform(
    scrollY,
    [0, 1400],
    [shouldReduceMotion ? 0 : -160, shouldReduceMotion ? 0 : -700]
  );

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

  return (
    <motion.section
      className="relative w-full"
      style={{ zIndex: 15, marginBottom: imageY }}
    >
      {/* y-transform lives here — does NOT carry overflow:hidden */}
      <motion.div className="relative w-full" style={{ y: imageY }}>

        {/* Separate, non-transformed wrapper owns overflow:hidden.
            A transformed element's overflow clipping is unreliable cross-browser. */}
        <div className="relative w-full overflow-hidden">
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
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </motion.div>

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
    </motion.section>
  );
}
