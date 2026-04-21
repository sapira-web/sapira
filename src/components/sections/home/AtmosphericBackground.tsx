'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AtmosphericBackground() {
  const [dotPos, setDotPos] = useState({ x: 0, y: 0, ready: false })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measure = () => {
      const dot = document.getElementById('headline-dot')
      const container = containerRef.current
      if (!dot || !container) return
      const dr = dot.getBoundingClientRect()
      const cr = container.getBoundingClientRect()
      setDotPos({ x: dr.left + dr.width / 2 - cr.left, y: dr.top + dr.height / 2 - cr.top, ready: true })
    }
    const timers = [100, 400, 900, 1800, 2800].map(d => setTimeout(measure, d))
    window.addEventListener('resize', measure)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >

      {/* ── 1. Base — cool neutral light, distinctly lighter than the warm masses */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F5F3EF' }} />

      {/* ── 2. LEFT PRIMARY MASS — the dominant volumetric presence */}
      {/* Core opacity 0.68 + moderate blur = clearly felt warm volume */}
      {/* Warm cream against cooler base creates unmistakable spatial contrast */}
      <motion.div
        style={{
          position: 'absolute',
          width: '1120px',
          height: '1120px',
          left: '-210px',
          top: '-90px',
          background: 'radial-gradient(circle, rgba(212,182,152,0.68) 0%, rgba(212,182,152,0.50) 20%, rgba(212,182,152,0.32) 40%, rgba(212,182,152,0.16) 58%, rgba(212,182,152,0.06) 72%, transparent 86%)',
          borderRadius: '50%',
          filter: 'blur(36px)',
        }}
        animate={{ x: [0, 18, -9, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── 3. UPPER-RIGHT LUMINOUS FORM — secondary, architectural, near-white */}
      {/* Brighter / more neutral than left mass. Creates expansive upper-right light. */}
      <motion.div
        style={{
          position: 'absolute',
          width: '840px',
          height: '840px',
          right: '-170px',
          top: '-210px',
          background: 'radial-gradient(circle, rgba(242,237,228,0.82) 0%, rgba(242,237,228,0.60) 18%, rgba(242,237,228,0.36) 40%, rgba(242,237,228,0.14) 62%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(42px)',
        }}
        animate={{ x: [0, -15, 10, 0], y: [0, 11, -7, 0] }}
        transition={{ duration: 33, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* ── 4. CENTRAL WARM CORE — Sapira identity / low-saturation red haze */}
      {/* Not a blob. An atmospheric warmth concentrated center-left. */}
      <motion.div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          left: '26%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(172,86,66,0.28) 0%, rgba(172,86,66,0.16) 28%, rgba(172,86,66,0.07) 52%, rgba(172,86,66,0.02) 70%, transparent 84%)',
          borderRadius: '50%',
          filter: 'blur(62px)',
        }}
        animate={{ x: [0, 11, -7, 0], y: [0, -9, 5, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
      />

      {/* ── 5. Text-zone illumination — brightens left without killing the atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(110deg, rgba(255,254,250,0.40) 0%, rgba(255,254,250,0.12) 28%, transparent 48%)',
        }}
      />

      {/* ── 6. Warm presence at headline dot — emerges 1.8s in, synced with "." reveal */}
      {dotPos.ready && (
        <motion.div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            left: dotPos.x - 350,
            top: dotPos.y - 350,
            background: 'radial-gradient(circle, rgba(185,88,70,0.17) 0%, rgba(185,88,70,0.06) 42%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* ── 7. Edge vignette — perimeter falloff, centers the composition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 86% 76% at 50% 50%, transparent 36%, rgba(38,24,14,0.05) 70%, rgba(38,24,14,0.10) 100%)',
        }}
      />

      {/* ── 8. Grain */}
      <div className="nucleate-grain" />

    </div>
  )
}
