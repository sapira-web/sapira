@AGENTS.md

# Sapira Website — Project Context

## What is Sapira
Sapira is an operational intelligence company. Their product, **Pharo**, is an AI layer deployed on top of existing enterprise systems (ERPs, spreadsheets, existing tools) to automate the coordination work that today is done manually by people. It does not replace existing systems — it connects, learns how the business actually operates, and automates the invisible coordination layer.

Target customers: European mid-to-large enterprises (€70M–€2B revenue) in manufacturing, financial services, logistics, retail, and hospitality.

## What we're building
A world-class marketing website. The reference for structure and composition is https://www.thisisstudiox.com/ — editorial, calm, confident, typography-driven. The reference for tone is Palantir (authoritative, premium B2B).

Current scope: Hero section only. Other sections will follow.

## Design System

### Typography
- Single family: **DM Sans** (Regular 400, Medium 500, Bold 700 only)
- Loaded via next/font/google
- Smoothing: antialiased

### Type scale (desktop)
- Display XL (hero headline): 88px, line-height 102%, tracking -3.5%, weight 400
- Body Large (subheadline): 20px, line-height 145%, tracking -1%, weight 400
- Eyebrow: 12px, uppercase, tracking +16% (letter-spacing: 0.16em), weight 500
- Caption: 10px, uppercase, tracking +18% (letter-spacing: 0.18em), weight 500
- CTA link: 16px, weight 500, underline with offset 4px
- Nav item: 12px, uppercase, tracking +10% (letter-spacing: 0.10em), weight 500
- Logo text: 18px, weight 500, tracking -2.5%

### Colors
- Foundation Black: #494848 (primary text, headlines)
- Ignition Red: #C64444 (primary CTA, accent — use sparingly)
- Oxide Red: #562B2A (secondary accent)
- Structural Grey: #C1BDB6 (borders, subtle dividers)
- Rational White: #EFEBE6 (background — NOT pure white, a warm cream)
- Neutral White: #F9F9F9 (secondary backgrounds if needed)

Text opacity variants for hierarchy:
- Pleno (headlines): 100%
- Subhead: 75%
- Eyebrow: 55%
- Caption: 45%

### Spacing scale (strict — nothing outside this list)
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 (px)

### Grid (desktop)
- Container: max-width 1440px
- Side margins: 64px
- Columns: 12
- Gutter: 24px
- Hero text: cols 1-7
- Hero video: cols 8-12

### Grid (mobile)
- Side margins: 24px
- Single column
- Everything stacks vertically

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- Framer Motion for animations
- next/font for typography

## Design principles
- Editorial, not SaaS. Think Financial Times + Palantir, not Salesforce.
- Typography does the heavy lifting. Color accents are rare and intentional.
- Ignition Red appears only on: primary CTAs, accent moments, and the one red point in the video.
- Everything breathes. Generous vertical space. No cramped layouts.
- Animations are subtle and purposeful. No bouncing, no scaling, no parallax for its own sake.
- The word "sapira" is always lowercase (brand rule).

## Working style
- Ask before assuming when specs are ambiguous.
- After making changes, report which files were created/modified.
- If you're about to install a new dependency, confirm first.
