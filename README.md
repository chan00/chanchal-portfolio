# Chanchal Bhakat — 3D Generalist & Developer Portfolio 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-chan00.github.io-success?style=for-the-badge&logo=github)](https://chan00.github.io/chanchal-portfolio/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r168-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

An immersive, high-performance portfolio showcasing 3D artistry, architecture visualization (ArchViz), BIM engineering, game development, and full-stack software development.

🔗 **Live Website**: [https://chan00.github.io/chanchal-portfolio/](https://chan00.github.io/chanchal-portfolio/)

---

## ✨ Features

- **🎭 3D Animated Character**: Interactive bone-rigged 3D character in Three.js with Draco compression. The character's head dynamically tracks the cursor in real-time and transitions seamlessly across scroll sections.
- **🔐 Encrypted 3D Asset Pipeline**: Custom encrypted GLTF/GLB model streaming with client-side decryption on the fly to protect proprietary 3D assets.
- **📜 Smooth Scroll & Parallax**: Powered by GSAP (ScrollSmoother, ScrollTrigger, SplitText) with buttery-smooth physics-based inertial scrolling, staggered typography reveals, and section transitions.
- **⚛️ Interactive Physics Tech Stack**: Dynamic 3D ball pit simulation built with React Three Fiber and Rapier physics (`@react-three/rapier`), allowing users to toss and interact with tech-logo spheres with N8AO ambient occlusion.
- **🖼️ Project Showcase & Media Lightbox**:
  - Horizontal project carousel with smooth navigation
  - Expandable high-resolution image galleries
  - Embedded video demonstrations
  - Full-screen lightbox with multi-level zoom (up to 6x), mouse/touch drag panning, and keyboard controls
- **💼 Interactive Career Timeline & Skill Cards**: Expandable and collapsible expertise cards with animated dashed dividers and responsive layouts for desktop, tablet, and mobile.
- **🎯 Dynamic Adaptive Cursor**: Smooth lerp-based custom cursor with contextual hover scaling and blend modes.
- **🌐 Base-Path Aware Architecture**: Centralized asset resolution (`src/utils/assets.ts`) ensuring flawless routing on both GitHub Pages subpaths (`/chanchal-portfolio/`) and root custom domains.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Core Framework** | React 18, TypeScript, Vite 6 |
| **3D & Graphics** | Three.js (r168), `@react-three/fiber`, `@react-three/drei` |
| **Physics Engine** | `@react-three/rapier` |
| **Post-Processing** | `@react-three/postprocessing` (N8AO ambient occlusion) |
| **Animation Suite** | GSAP 3 (ScrollSmoother, ScrollTrigger, SplitText) |
| **Icons & Media** | `react-icons` (Material Design, Ionicons), `react-fast-marquee` |
| **Deployment** | GitHub Actions & GitHub Pages, Cloudflare Pages |

---

## 📁 Project Structure

```
chanchal-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions CI/CD to GitHub Pages
├── public/
│   ├── draco/                     # Google Draco mesh decompression binaries
│   ├── images/                    # UI images, textures, and tech logos
│   ├── models/                    # Encrypted character model & HDR environments
│   └── projects/                  # Portfolio project captures and videos
├── src/
│   ├── components/
│   │   ├── Character/             # Three.js 3D character rig & lighting
│   │   ├── styles/                # Modular CSS stylesheets
│   │   ├── utils/                 # GSAP timeline orchestrators & animations
│   │   ├── About.tsx              # About summary section
│   │   ├── Career.tsx             # Career journey & milestones
│   │   ├── Contact.tsx            # Contact links & footer
│   │   ├── Cursor.tsx             # Animated custom cursor
│   │   ├── Landing.tsx            # Hero landing section
│   │   ├── Lightbox.tsx           # Fullscreen pan/zoom gallery & video player
│   │   ├── Loading.tsx            # Initial preloading screen
│   │   ├── Navbar.tsx             # Navigation header & smoother initialization
│   │   ├── TechStack.tsx          # 3D Rapier physics spheres
│   │   ├── WhatIDo.tsx            # Expandable domain expertise cards
│   │   ├── Work.tsx               # Portfolio projects showcase
│   │   └── WorkImage.tsx          # Project card media container
│   ├── context/
│   │   └── LoadingProvider.tsx    # Global loading state management
│   ├── utils/
│   │   └── assets.ts              # Base URL resolver for GitHub Pages & custom domains
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # React DOM entry point
│   └── index.css                  # Global design tokens & styling
├── index.html                     # HTML entry point
├── package.json                   # Project scripts and dependencies
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite bundler configuration with dynamic base path
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

```bash
# 1. Clone repository
git clone https://github.com/chan00/chanchal-portfolio.git
cd chanchal-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Build & Deployment

### Building Locally

```bash
# Standard root build (for localhost, Cloudflare, Vercel, or custom domains)
npm run build

# Preview production build locally
npm run preview
```

### GitHub Pages Build

To test the GitHub Pages build locally with the subpath prefix (`/chanchal-portfolio/`):

```bash
GITHUB_PAGES=true npm run build
```

### Automated CI/CD (GitHub Actions)

This repository includes a GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
1. Any push to `main` triggers an automatic build with `GITHUB_PAGES=true`.
2. The generated artifacts in `./dist` are deployed directly to GitHub Pages.

---

## 🔒 3D Model Encryption Scripts

To safeguard the 3D model assets:

```bash
# Encrypt the raw GLB character into public/models/character.enc
npm run encrypt-model

# Decrypt the encrypted model back to GLB for editing in Blender/3ds Max
npm run decrypt-model
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

Designed & Developed by **Chanchal Bhakat** © 2026
