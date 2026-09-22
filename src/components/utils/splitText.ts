import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

/**
 * ParaElement
 * -----------
 * Extends the base HTMLElement with optional GSAP animation and SplitText
 * references so we can track and clean up per-element animations when the
 * function re-runs (e.g. on window resize / ScrollTrigger refresh).
 */
interface ParaElement extends HTMLElement {
  /** The GSAP animation instance attached to this element. */
  anim?: gsap.core.Animation;
  /** The SplitText instance that wraps this element's text nodes. */
  split?: SplitText;
}

// Register the GSAP plugins once at module level
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

/**
 * setSplitText
 * ------------
 * Applies scroll-triggered **text-reveal animations** to two categories of
 * elements found in the DOM:
 *
 *  1. **Paragraphs** (`.para`) – Split into words; each word fades and slides
 *     up when its parent section enters the viewport.
 *  2. **Titles** (`.title`) – Split into characters; each character fades,
 *     slides up, and un-rotates into place when its parent section is visible.
 *
 * The function is also registered as a ScrollTrigger "refresh" listener so
 * that SplitText measurements are recalculated when the layout changes.
 *
 * **Important:** On screens narrower than 900 px the function exits early
 * because SplitText line-wrapping can cause layout issues on very small screens.
 */
export default function setSplitText() {
  // Prevent mobile resize events from re-triggering ScrollTrigger refreshes
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Skip split-text animations on small screens (< 900 px)
  if (window.innerWidth < 900) return;

  // Collect all paragraph and title elements that need text-reveal animations
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  // Responsive trigger start position – tablet/mobile starts lower in viewport
  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  // ScrollTrigger toggle actions: play on enter, pause on leave-back,
  // resume on re-enter, reverse on leave-top
  const ToggleAction = "play pause resume reverse";

  // ─────────────────────────────
  // Paragraph word-reveal animation
  // ─────────────────────────────
  paras.forEach((para: ParaElement) => {
    // Make the paragraph visible (CSS starts it hidden to avoid FOUC)
    para.classList.add("visible");

    // If a previous animation exists (e.g. from a refresh), kill it cleanly
    // and revert the SplitText DOM changes before re-splitting.
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    // Split the paragraph text into lines and words
    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line", // each line is wrapped for overflow clipping
    });

    // Animate each word: invisible + 80 px below → visible at natural position
    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement, // grandparent is the section
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02, // slight delay between each word
      }
    );
  });

  // ─────────────────────────────
  // Title character-reveal animation
  // ─────────────────────────────
  titles.forEach((title: ParaElement) => {
    // Clean up previous animation/split (same pattern as paragraphs above)
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }

    // Split title text into characters and lines
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    // Animate each character: invisible + 80 px below + 10° rotation →
    // visible, in-place, upright
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03, // slightly longer stagger than paragraphs for emphasis
      }
    );
  });

  // Re-run this function whenever ScrollTrigger recalculates positions
  // (e.g. after images load or the layout shifts).
  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
