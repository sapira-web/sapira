'use client'

export default function AtmosphericBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base — gradient diagonal cálido */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #EFEBE6 0%, #E8DDD3 40%, #E0CDBF 70%, #D4B8A5 100%)',
        }}
      />

      {/* Orbe 1 — blanco luminoso, arriba-izquierda, protagonista */}
      <div
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-15%',
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 252, 247, 0.95) 0%, rgba(255, 252, 247, 0.6) 30%, rgba(255, 252, 247, 0) 65%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />

      {/* Orbe 2 — blanco luminoso, arriba-derecha, secundario */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 252, 247, 0.85) 0%, rgba(255, 252, 247, 0.4) 35%, rgba(255, 252, 247, 0) 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />

      {/* Orbe 3 — acento Ignition Red, centro, detrás del headline */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198, 68, 68, 0.25) 0%, rgba(198, 68, 68, 0.1) 40%, rgba(198, 68, 68, 0) 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* Orbe 4 — blanco luminoso, abajo-derecha, base */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 252, 247, 0.7) 0%, rgba(255, 252, 247, 0.3) 40%, rgba(255, 252, 247, 0) 70%)',
          filter: 'blur(45px)',
          willChange: 'transform',
        }}
      />

      {/* Grain — textura fotográfica visible */}
      <div
        className="atmospheric-grain"
        aria-hidden="true"
      />
    </div>
  )
}
