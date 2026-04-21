'use client';

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/content/site";

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 flex items-center px-8 md:px-14 border-b border-structural h-16"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.40)' }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
        <nav className="w-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-logo font-medium text-foundation lowercase tracking-[-0.025em]">
            sapira
          </a>

          {/* Nav items — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link text-nav font-medium text-foundation uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-ignition focus-visible:outline-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA — min touch target 44px */}
          <a
            href="#"
            className="text-nav font-medium uppercase border border-foundation px-4 py-3 min-h-[44px] flex items-center text-foundation hover:bg-foundation hover:text-rational transition-all duration-200 cursor-pointer"
          >
            See it on your data →
          </a>
        </nav>
    </motion.header>
  );
}
