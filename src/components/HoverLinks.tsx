import "./styles/style.css";

/**
 * HoverLinks — A text hover reveal component.
 *
 * Renders the same text twice, stacked vertically inside `.hover-in`.
 * By default, only the first instance is visible. On hover, CSS
 * translateY shifts both up — the first slides out of view while
 * the duplicate slides into view, creating a smooth "flip" effect.
 *
 * Used in: Navbar links, Resume button
 *
 * @param text    — The label to display
 * @param cursor  — If false (default), disables the custom cursor
 *                  on this element via data-cursor="disable"
 */
const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    // Outer wrapper: clips overflow so the sliding text stays contained
    <div className="hover-link" data-cursor={!cursor && `disable`}>
      {/* Inner wrapper: translateY on hover moves both text instances up */}
      <div className="hover-in">
        {/* First instance: visible by default, slides out on hover */}
        {text}
        {/* Second instance: hidden below, slides into view on hover */}
        <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
