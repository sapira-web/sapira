'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const E = [0.22, 1, 0.36, 1] as const

export default function TrustSignal() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 })

  const [count, setCount] = useState(72)
  const [mplusSettled, setMplusSettled] = useState(false)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      setCount(100)
      setMplusSettled(true)
      return
    }

    let settled = false
    const startTimer = setTimeout(() => {
      const from = 72, to = 100, duration = 2700
      const t0 = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const val = Math.round(from + (to - from) * eased)
        setCount(val)
        if (val >= 100 && !settled) {
          settled = true
          setTimeout(() => setMplusSettled(true), 60)
        }
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 200)

    return () => clearTimeout(startTimer)
  }, [isInView, shouldReduceMotion])

  function reveal(delay: number, opts: { scale?: number } = {}) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 1 : 0 } as { opacity: number },
        transition: { duration: 0.4 },
      }
    }
    return {
      initial: { opacity: 0, y: 32, filter: 'blur(10px)', ...(opts.scale ? { scale: opts.scale } : {}) },
      animate: isInView
        ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
        : { opacity: 0, y: 32, filter: 'blur(10px)', ...(opts.scale ? { scale: opts.scale } : {}) },
      transition: { duration: 1.05, delay, ease: E },
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#EFEBE6', position: 'relative', overflow: 'hidden' }}
    >

      {/* ── Atmospheric background — same world as hero ───────────── */}

      {/* Large warm mass — center-left, very diffuse */}
      <div
        style={{
          position: 'absolute',
          width: '1100px',
          height: '900px',
          left: '-160px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(212,182,152,0.38) 0%, rgba(212,182,152,0.18) 30%, rgba(212,182,152,0.06) 58%, transparent 78%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle warm Sapira red — right side, barely there */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '700px',
          right: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(172,86,66,0.11) 0%, rgba(172,86,66,0.04) 44%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Soft radial glow behind number zone */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '560px',
          left: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(198,68,68,0.06) 0%, rgba(198,68,68,0.02) 48%, transparent 72%)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      {/* Edge falloff — very soft */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(38,24,14,0.04) 80%, rgba(38,24,14,0.07) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div
        className="w-full px-8 md:px-14"
        style={{ paddingTop: '220px', paddingBottom: '220px', position: 'relative', zIndex: 2 }}
      >

        {/* "Trusted by teams operating" */}
        <motion.p
          style={{
            fontSize: 'clamp(30px, 4.2vw, 66px)',
            fontWeight: 400,
            letterSpacing: '-0.028em',
            lineHeight: 1.0,
            color: 'rgba(73,72,72,0.52)',
            margin: 0,
          }}
          {...reveal(0)}
        >
          Trusted by teams operating
        </motion.p>

        {/* €100M+ */}
        <motion.p
          style={{
            fontSize: 'clamp(96px, 17.5vw, 236px)',
            fontWeight: 400,
            letterSpacing: '-0.048em',
            lineHeight: 1.0,
            color: '#C64444',
            margin: 0,
          }}
          {...reveal(0.18, { scale: 1.04 })}
        >
          €{count}
          <motion.span
            style={{ display: 'inline-block', transformOrigin: 'left center' }}
            initial={{ opacity: 0.35, scale: 1.06 }}
            animate={mplusSettled ? { opacity: 1, scale: 1 } : { opacity: 0.35, scale: 1.06 }}
            transition={{ duration: 0.38, ease: E }}
          >
            M+
          </motion.span>
        </motion.p>

        {/* "in annual procurement" */}
        <motion.p
          style={{
            fontSize: 'clamp(30px, 4.2vw, 66px)',
            fontWeight: 400,
            letterSpacing: '-0.028em',
            lineHeight: 1.0,
            color: 'rgba(73,72,72,0.52)',
            margin: 0,
          }}
          {...reveal(0.38)}
        >
          in annual procurement
        </motion.p>

      </div>
    </section>
  )
}
