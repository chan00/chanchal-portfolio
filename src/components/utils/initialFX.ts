import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

/**
 * initialFX
 * ---------
 * Runs the **first-load entrance animations** for the landing page.
 *
 * This function is called once the loading screen finishes. It:
 *  1. Re-enables page scrolling and un-pauses the ScrollSmoother instance.
 *  2. Transitions the background colour to the portfolio's dark theme (#0a0e17).
 *  3. Splits the hero heading / sub-heading text into individual characters
 *     using GSAP's SplitText plugin and animates them in with a staggered
 *     blur-to-clear, slide-up reveal.
 *  4. Fades in the header / nav bar, social icons bar, and nav-fade overlay.
 *  5. Kicks off two infinite text-loop animations that alternate between pairs
 *     of descriptor lines (e.g. role titles) below the main heading.
 */
export function initialFX() {
  // Allow the page to scroll again (was locked during the loader)
  document.body.style.overflowY = "auto";
  // Resume the GSAP ScrollSmoother that was paused while loading
  smoother.paused(false);
  // Activate the main content container (removes initial "hidden" state)
  document.getElementsByTagName("main")[0].classList.add("main-active");

  // Smoothly transition the body background to the portfolio's dark theme
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // ─────────────────────────────────────
  // Hero heading character-split animation
  // ─────────────────────────────────────
  // Splits h3 (greeting), h2 (sub-title), and h1 (main name) into chars/lines
  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line", // wraps each line for overflow-hidden clipping
    }
  );

  // Staggered reveal: characters slide up from 80 px, blur fades from 5 px → 0
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // ─────────────────────────────────────
  // Descriptor lines (looping text pairs)
  // ─────────────────────────────────────
  // Shared SplitText config for the rotating descriptor lines
  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  // First pair of descriptor texts
  const landingText2 = new SplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Fade-in for the static descriptor heading wrapper
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  // Fade in the top navigation bar, social icons, and nav-fade element
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Second set of descriptor texts used for the alternating loop
  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new SplitText(".landing-h2-1", TextProps);
  const landingText5 = new SplitText(".landing-h2-2", TextProps);

  // Start infinite text-swap loops between each pair of descriptors
  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

/**
 * LoopText
 * --------
 * Creates an infinitely repeating GSAP timeline that alternates between
 * two SplitText instances, simulating a vertical carousel / ticker effect.
 *
 * Animation flow per cycle:
 *  1. Text1 slides up and out (y: 0 → −80).
 *  2. Text2 slides up and into view (y: 80 → 0).
 *  3. Text2 slides up and out (y: 0 → −80).
 *  4. Text1 slides back into view (y: 80 → 0).
 *  Then repeats with a 1-second pause between cycles.
 *
 * @param Text1 - The first SplitText instance (shown initially).
 * @param Text2 - The second SplitText instance (off-screen initially).
 */
function LoopText(Text1: SplitText, Text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  const delay = 4; // seconds before first swap starts
  const delay2 = delay * 2 + 1; // seconds before second swap starts

  tl
    // Step 1 – Slide Text2 into view from below
    .fromTo(
      Text2.chars,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    // Step 2 – Slide Text1 back into view from below (return)
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    // Step 3 – Slide Text1 up and out of view
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    // Step 4 – Slide Text2 up and out of view
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
