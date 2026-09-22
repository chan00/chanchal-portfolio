import * as THREE from "three";
import gsap from "gsap";

/**
 * setCharTimeline
 * ---------------
 * Creates scroll-driven GSAP timelines that animate the 3D character model
 * and associated DOM elements as the user scrolls through the portfolio sections.
 *
 * Three main timelines are set up (desktop only):
 *  - tl1 (Landing → About): Rotates the character, zooms the camera, and fades
 *    the landing container out while sliding the "about me" section into view.
 *  - tl2 (About → WhatIDo): Pushes the camera further back, reveals the monitor
 *    and screen-light on the 3D desk, fades the about section out, and shows
 *    the "What I Do" skill boxes.
 *  - tl3 (WhatIDo section): Slides the character model off-screen upward.
 *
 * On mobile (≤ 1024 px) only a minimal timeline is created to toggle the
 * "what-box-in" container visibility, because the 3D animations are too heavy
 * for small viewports.
 *
 * @param character - The loaded 3D character scene object (may be null during load).
 * @param camera    - The Three.js perspective camera used for the scene.
 */
export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  /**
   * Random intensity value used to create a subtle, screen-flicker effect
   * on the monitor's emissive light. Updated every 200 ms.
   */
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  // ──────────────────────────────────────────────
  // Timeline 1 – Landing section scroll animation
  // ──────────────────────────────────────────────
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true, // ties animation progress directly to scroll position
      invalidateOnRefresh: true, // recalculates values on resize
    },
  });

  // ──────────────────────────────────────────────
  // Timeline 2 – About section scroll animation
  // ──────────────────────────────────────────────
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // ──────────────────────────────────────────────
  // Timeline 3 – "What I Do" section scroll animation
  // ──────────────────────────────────────────────
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // References to the monitor screen-light and monitor mesh in the 3D model
  let screenLight: any, monitor: any;

  // Walk through the character's direct children to locate the desk monitor
  // and the screen-light objects, then configure their initial material state.
  character?.children.forEach((object: any) => {
    // "Plane004" is the desk/monitor group in the 3D model
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        // Start fully transparent – will be revealed by tl2
        child.material.transparent = true;
        child.material.opacity = 0;
        // Identify the actual monitor screen by its material name
        if (child.material.name === "Material.018") {
          monitor = child;
          child.material.color.set("#FFFFFF"); // white base color
        }
      });
    }

    // "screenlight" is a flat plane that simulates monitor glow
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#B0F5EA"); // teal-ish glow

      // Infinite looping timeline that randomly flickers the emissive
      // intensity to simulate a CRT / screen-refresh effect.
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
        emissiveIntensity: () => intensity * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = object;
    }
  });

  // "spine005" is the neck bone in the character rig – used to tilt the head
  const neckBone = character?.getObjectByName("spine005");

  // =====================
  // Desktop animations
  // =====================
  if (window.innerWidth > 1024) {
    if (character) {
      // --- TL1: Landing → About transition ---
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0) // rotate character
        .to(camera.position, { z: 22 }, 0) // dolly camera back
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0) // shift model left
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0) // fade out hero text
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0) // slide hero text down
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0); // slide in about section

      // --- TL2: About → WhatIDo transition ---
      tl2
        // Camera pulls back and rises
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0) // parallax the about section
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0) // fade about section
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        // Rotate character to face the monitor
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        // Tilt the neck bone so the character looks down at the desk
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        // Reveal the monitor and screen glow in sequence
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        // Show the "What I Do" skill boxes
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        // Animate the monitor mesh into its final position
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        // Shrink and fade the character rim-light ring
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      // --- TL3: Scroll past the "What I Do" section ---
      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    // =====================
    // Mobile / tablet fallback
    // =====================
    if (character) {
      // Only toggle display of the skill boxes when they scroll into view
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

/**
 * setAllTimeline
 * ---------------
 * Sets up the scroll-driven GSAP timeline for the **Career** section.
 *
 * Animates:
 *  - The vertical timeline bar (`.career-timeline`) growing from 10 % to 100 %
 *    max-height as the user scrolls through the career section.
 *  - Each career info card (`.career-info-box`) fading in with a stagger.
 *  - The pulsing career dots (`.career-dot`) stopping their infinite animation
 *    once they scroll into view.
 *  - On desktop, the entire career section gets a subtle upward parallax.
 */
export function setAllTimeline() {
  // Career section scroll-linked timeline
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    // Gradually reveal the vertical timeline bar from top to bottom
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    // Quick fade-in for the timeline container itself
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    // Staggered fade-in for each career entry card
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    // Stop the infinite pulse animation on the career dots after scroll
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  // Desktop: slight upward parallax on the career section
  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    // Mobile: no parallax – keep the section stationary
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
