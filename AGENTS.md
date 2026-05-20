# PVEP Day 2026 Landing Page - Agent Instructions

## Project context

This is a mobile-first premium corporate event landing page for PVEP Day 2026.

The page is built with:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- next/image

The page displays 6 official slide images as the main visual design.

Image paths:
- public/images/website-01.jpg
- public/images/website-02.jpg
- public/images/website-03.jpg
- public/images/website-04.jpg
- public/images/website-05.jpg
- public/images/website-06.jpg

Current features:
- Mobile-first landing page
- Dark green premium corporate background
- Floating navigation
- Scroll progress
- Back-to-top button
- Tap-to-zoom modal for all 6 slides
- SEO metadata
- Open Graph metadata
- Twitter Card
- JSON-LD Event schema
- sr-only semantic SEO content
- README in Vietnamese
- npm run build passes
- npm run lint passes

## Critical rules

The slide images are the source of truth.

Never:
- Redesign the slides
- Recreate slide content with HTML
- Crop slide images
- Stretch slide images
- Distort slide images
- Modify the slide artwork
- Overlay visible text on top of slide artwork
- Change colors, typography, layout, spacing, or composition inside the slides

Allowed:
- Improve the surrounding web experience
- Improve mobile-first UX
- Improve smoothness and animation
- Improve modal viewer
- Improve navigation
- Improve background depth
- Improve performance
- Improve accessibility
- Improve SEO implementation
- Improve code quality

## Primary goal

Make the website feel like a premium professional event microsite, not just a slide gallery, while preserving the slide visuals 100%.

Mobile users are the priority. Desktop should still look polished, but do not optimize desktop at the expense of mobile.

## Quality requirements

Before finishing any task:
- Run npm run build
- Run npm run lint
- Fix all TypeScript, ESLint, hydration, or build errors
- Confirm that all 6 slides remain fully visible without cropping or distortion