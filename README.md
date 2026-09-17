# Chanchal Bhakat — Portfolio 🚀

An immersive, animated portfolio site featuring a **3D character** (Three.js), **GSAP scroll-driven animations**, **physics-based tech visualization** (React Three Fiber + Rapier), and a **custom cursor**.

## ✨ Features

- **3D Animated Character** — Raw Three.js scene with a bone-rigged character whose head follows your cursor in real-time
- **Smooth Scroll Animations** — GSAP ScrollSmoother with section-level parallax, text reveals, and character transitions
- **Physics Tech Stack** — Interactive 3D spheres with tech logos powered by Rapier physics engine
- **Expandable Skill Cards** — Three hover-expandable cards: ArchViz | BIM, Game Dev, and Fullstack Development
- **Custom Cursor** — Lerp-based animated cursor with context-aware hover states
- **Responsive Design** — Desktop and mobile layouts with adaptive 3D rendering
- **Loading Experience** — Animated loading screen with progress indicator and marquee text

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Core** | React 18, TypeScript, Vite |
| **3D Engine** | Three.js, @react-three/fiber, @react-three/drei |
| **Physics** | @react-three/rapier |
| **Post-processing** | @react-three/postprocessing (N8AO) |
| **Animations** | GSAP (ScrollTrigger, ScrollSmoother, SplitText) |
| **UI** | react-icons, react-fast-marquee |

## 📁 Project Structure

```
src/
├── main.tsx                      # React entry point
├── App.tsx                       # Lazy loads MainContainer + CharacterModel
├── context/
│   └── LoadingProvider.tsx        # Global loading state
├── components/
│   ├── MainContainer.tsx          # Page layout orchestrator
│   ├── Navbar.tsx                 # Header + ScrollSmoother init
│   ├── Landing.tsx                # Hero section with name + roles
│   ├── About.tsx                  # About me
│   ├── WhatIDo.tsx                # 3 expandable skill cards
│   ├── Career.tsx                 # Career timeline
│   ├── Work.tsx                   # Project carousel
│   ├── TechStack.tsx              # 3D physics tech spheres
│   ├── Contact.tsx                # Contact + social links
│   ├── Cursor.tsx                 # Custom animated cursor
│   ├── Loading.tsx                # Loading screen
│   ├── SocialIcons.tsx            # Magnetic social icons sidebar
│   ├── Character/
│   │   ├── Scene.tsx              # Three.js scene setup
│   │   └── utils/                 # Character, lighting, animation, mouse, resize
│   ├── utils/
│   │   ├── GsapScroll.ts          # Scroll-driven GSAP timelines
│   │   ├── initialFX.ts           # Landing intro animations
│   │   └── splitText.ts           # SplitText scroll animations
│   └── styles/                    # Component-level CSS files
public/
├── images/                        # Project screenshots + tech logos
└── models/                        # GLB character model, HDR environment, Draco decoder
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build
```

## ⚠️ GSAP Club Plugins

This project uses GSAP trial plugins (`ScrollSmoother`, `SplitText`). The trial versions work in development but **cannot be deployed to production**. For production hosting, you need [GSAP Club plugins](https://gsap.com/docs/v3/Installation/).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed and Developed by **Chanchal Bhakat** © 2026
