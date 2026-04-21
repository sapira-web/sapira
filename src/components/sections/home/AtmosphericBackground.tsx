'use client'

export default function AtmosphericBackground() {
  return (
    <>
      {/* Base */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#F9F9F9' }}
        aria-hidden="true"
      />

      {/* Volume 1 — Large warm sphere, bottom-left */}
      <div
        className="atm-vol absolute z-0 pointer-events-none"
        style={{
          left: '-220px',
          bottom: '-200px',
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,206,183,0.78) 0%, rgba(234,213,193,0.44) 42%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'atm-drift-1 34s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Volume 2 — Secondary light, upper-right */}
      <div
        className="atm-vol absolute z-0 pointer-events-none"
        style={{
          right: '-100px',
          top: '-130px',
          width: '840px',
          height: '840px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,234,218,0.72) 0%, rgba(248,238,224,0.38) 43%, transparent 70%)',
          filter: 'blur(82px)',
          animation: 'atm-drift-2 28s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Volume 3 — Ambient glow, center-right */}
      <div
        className="atm-vol absolute z-0 pointer-events-none"
        style={{
          right: '3%',
          top: '26%',
          width: '740px',
          height: '740px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210,183,162,0.46) 0%, rgba(198,170,148,0.22) 43%, transparent 70%)',
          filter: 'blur(112px)',
          animation: 'atm-drift-3 40s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Grain — tactile surface */}
      <div
        className="absolute inset-0 z-0 pointer-events-none grain-overlay"
        aria-hidden="true"
      />
    </>
  )
}
