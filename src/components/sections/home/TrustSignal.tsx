'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const E = [0.22, 1, 0.36, 1] as const

function useCountUp(
  from: number,
  to: number,
  duration: number,
  trigger: boolean,
  instant: boolean,
  startDelay: number = 0
) {
  const [value, setValue] = useState(instant ? to : from)

  useEffect(() => {
    if (!trigger) return
    if (instant) { setValue(to); return }

    const timer = setTimeout(() => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(from + (to - from) * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, startDelay * 1000)

    return () => clearTimeout(timer)
  }, [trigger, from, to, duration, instant, startDelay])

  return value
}

export default function TrustSignal() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Counter starts 250ms after the headline begins entering
  const count = useCountUp(82, 100, 2400, isInView, !!shouldReduceMotion, 0.25)

  function line(delay: number) {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 1 : 0 },
        transition: { duration: 0.4 },
      }
    }
    return {
      initial: { opacity: 0, y: 40, filter: 'blur(12px)' },
      animate: isInView
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 40, filter: 'blur(12px)' },
      transition: { duration: 1.1, delay, ease: E },
    }
  }

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#562B2A' }}>
      <div
        className="w-full px-8 md:px-14"
        style={{ paddingTop: '200px', paddingBottom: '200px' }}
      >

        <motion.p
          style={{
            fontSize: 'clamp(44px, 6vw, 90px)',
            fontWeight: 400,
            letterSpacing: '-0.032em',
            lineHeight: 1.04,
            color: '#F9F9F9',
            margin: 0,
          }}
          {...line(0)}
        >
          Trusted by teams operating
        </motion.p>

        <motion.p
          style={{
            fontSize: 'clamp(44px, 6vw, 90px)',
            fontWeight: 400,
            letterSpacing: '-0.032em',
            lineHeight: 1.04,
            color: '#F9F9F9',
            margin: 0,
          }}
          {...line(0.12)}
        >
          <span style={{ color: '#C64444', fontWeight: 500 }}>€{count}M+</span>{' '}
          in annual procurement
        </motion.p>

      </div>
    </section>
  )
}
