import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

/**
 * Cursor — Custom animated cursor that replaces the default browser cursor.
 *
 * How it works:
 * - A small div (`.cursor-main`) follows the mouse with a smooth delay
 *   using linear interpolation (lerp). Instead of snapping directly to the
 *   mouse position, it divides the distance by a "delay" factor (6) each
 *   frame, creating a trailing/easing effect.
 *
 * - Elements with `data-cursor` attributes trigger special behaviors:
 *   • `data-cursor="disable"` — Hides the cursor (adds `.cursor-disable`)
 *     Used on: social links, nav links, buttons, etc.
 *   • `data-cursor="icons"` — Snaps the cursor to the element's bounding
 *     box and resizes it to cover the element (adds `.cursor-icons`)
 *     Used on: the social icons sidebar
 *
 * - GSAP is used for sub-pixel smooth positioning via `gsap.to()`
 */
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false; // Flag: when true, cursor is snapped to an icon element
    const cursor = cursorRef.current!;

    // Track the real mouse position and the smoothed cursor position
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    // Update raw mouse coordinates on every mouse move
    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    // Animation loop: smoothly interpolate cursor position toward the mouse
    requestAnimationFrame(function loop() {
      if (!hover) {
        // Lerp factor — higher = slower/smoother trailing
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      requestAnimationFrame(loop);
    });

    // Set up hover behaviors for elements with data-cursor attributes
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          // Snap mode: cursor jumps to the element and resizes to cover it
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true; // Stop the lerp loop from overriding position
        }

        if (element.dataset.cursor === "disable") {
          // Hide mode: cursor becomes invisible over clickable elements
          cursor.classList.add("cursor-disable");
        }
      });

      element.addEventListener("mouseout", () => {
        // Reset: remove all special states, resume normal lerp following
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });
  }, []);

  // The actual cursor element — a small circle styled via Cursor.css
  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
