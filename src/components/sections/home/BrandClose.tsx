'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const E = [0.22, 1, 0.36, 1] as const

export default function BrandClose() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const anim = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 0.94 : 0 },
        transition: { duration: 0.4 },
      }
    : {
        initial: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 1.01 },
        animate: isInView
          ? { opacity: 0.94, y: 0, filter: 'blur(0px)', scale: 1 }
          : { opacity: 0, y: 40, filter: 'blur(10px)', scale: 1.01 },
        transition: { duration: 1.3, ease: E },
      }

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#F9F9F9',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '0',
        paddingBottom: '64px',
      }}
    >
      <motion.p
        style={{
          margin: 0,
          paddingLeft: '64px',
          paddingRight: '64px',
          fontSize: 'clamp(96px, 16.5vw, 220px)',
          fontWeight: 400,
          letterSpacing: '-0.045em',
          lineHeight: 0.92,
          color: '#494848',
          userSelect: 'none',
        }}
        {...anim}
      >
        sapira
      </motion.p>
    </section>
  )
}
