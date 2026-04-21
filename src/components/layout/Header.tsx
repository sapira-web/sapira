'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/content/site';

export default function Header() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 flex items-center px-8 md:px-14"
      style={{
        height: '68px',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)',
      }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Wordmark */}
      <a
        href="/"
        className="text-[20px] font-medium text-foundation tracking-[-0.025em] lowercase hover:text-foundation/75 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
      >
        sapira
      </a>

      {/* Nav — centered, absolutely positioned so wordmark and CTA stay at edges */}
      <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
        {siteConfig.navigation.map(item => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link text-[12px] uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Nav CTA */}
      <a
        href="#contact"
        className="cta-nav-pill ml-auto focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
      >
        See it on your data
        <span className="cta-nav-arrow">→</span>
      </a>
    </motion.header>
  );
}
