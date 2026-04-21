'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AtmosphericBackground() {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0, ready: false })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measurePosition = () => {
      const dot = document.getElementById('headline-dot')
      const container = containerRef.current
      if (!dot || !container) return

      const dotRect = dot.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const x = dotRect.left + dotRect.width / 2 - containerRect.left
      const y = dotRect.top + dotRect.height / 2 - containerRect.top

      setDotPosition({ x, y, ready: true })
    }

    const timeouts = [100, 300, 600, 1000, 1800, 2500].map((delay) =>
      setTimeout(measurePosition, delay)
    )

    window.addEventListener('resize', measurePosition)
    window.addEventListener('scroll', measurePosition)

    return () => {
      timeouts.forEach(clearTimeout)
      window.removeEventListener('resize', measurePosition)
      window.removeEventListener('scroll', measurePosition)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#F7F4F0',
        }}
      />

      {/* Orb 1 — left, terracotta */}
      <motion.div
        style={{
          position: 'absolute',
          width: '1200px',
          height: '1200px',
          left: '-150px',
          top: '-50px',
          background: 'radial-gradient(circle, rgba(198,145,130,0.48) 0%, rgba(198,145,130,0.36) 18%, rgba(198,145,130,0.22) 38%, rgba(198,145,130,0.10) 58%, transparent 78%)',
          borderRadius: '50%',
        }}
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.03, 0.98, 1] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 2 — top-right, white luminous halo */}
      <motion.div
        style={{
          position: 'absolute',
          width: '1100px',
          height: '1100px',
          right: '-150px',
          top: '-250px',
          background: 'radial-gradient(circle, rgba(255,252,247,0.90) 0%, rgba(255,252,247,0.65) 15%, rgba(255,252,247,0.40) 35%, rgba(255,252,247,0.18) 55%, transparent 75%)',
          borderRadius: '50%',
        }}
        animate={{ x: [0, -18, 12, 0], y: [0, 12, -8, 0], scale: [1, 0.97, 1.02, 1] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 3 — bottom-left, white secondary halo */}
      <motion.div
        style={{
          position: 'absolute',
          width: '950px',
          height: '950px',
          left: '-250px',
          bottom: '-300px',
          background: 'radial-gradient(circle, rgba(255,252,247,0.92) 0%, rgba(255,252,247,0.68) 15%, rgba(255,252,247,0.40) 35%, rgba(255,252,247,0.18) 58%, transparent 78%)',
          borderRadius: '50%',
        }}
        animate={{ x: [0, 15, -20, 0], y: [0, -10, 8, 0], scale: [1, 1.04, 0.97, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Focal point — Ignition Red, anchored to headline dot */}
      {dotPosition.ready && (
        <motion.div
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            left: dotPosition.x - 450,
            top: dotPosition.y - 450,
            background: 'radial-gradient(circle, rgba(198,68,68,0.55) 0%, rgba(198,68,68,0.45) 6%, rgba(198,68,68,0.33) 14%, rgba(198,68,68,0.22) 24%, rgba(198,68,68,0.14) 36%, rgba(198,68,68,0.08) 48%, rgba(198,68,68,0.04) 62%, rgba(198,68,68,0.015) 78%, transparent 100%)',
            borderRadius: '50%',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 0.96, 1],
            x: [0, -6, 8, 0],
            y: [0, 6, -4, 0],
          }}
          transition={{
            opacity: { duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 2 },
            x: { duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 2 },
            y: { duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 2 },
          }}
        />
      )}

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 92% 78% at 50% 50%, transparent 45%, rgba(73,72,72,0.03) 80%, rgba(73,72,72,0.07) 100%)',
        }}
      />

      {/* Grain */}
      <div className="nucleate-grain" />
    </div>
  )
}
