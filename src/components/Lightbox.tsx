import { useState, useEffect, useCallback, useRef } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdZoomIn,
  MdZoomOut,
  MdFitScreen,
} from "react-icons/md";
import { smoother } from "./Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { asset } from "../utils/assets";
import "./styles/Lightbox.css";

interface LightboxProps {
  images?: string[];
  video?: string;
  initialIndex?: number;
  enableZoom?: boolean;
  onClose: () => void;
}

const Lightbox = ({
  images,
  video,
  initialIndex = 0,
  enableZoom = false,
  onClose,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // Keep positionRef in sync
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const isVideoMode = !!video;
  const hasMultiple = !isVideoMode && images && images.length > 1;

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
  }, []);

  const goToPrev = useCallback(() => {
    if (!hasMultiple) return;
    resetZoom();
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev === 0 ? images!.length - 1 : prev - 1));
  }, [images, hasMultiple, resetZoom]);

  const goToNext = useCallback(() => {
    if (!hasMultiple) return;
    resetZoom();
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev === images!.length - 1 ? 0 : prev + 1));
  }, [images, hasMultiple, resetZoom]);

  const zoomIn = useCallback(() => {
    if (!enableZoom) return;
    setScale((prev) => {
      const next = Math.min(Number((prev + 0.5).toFixed(1)), 6);
      return next;
    });
  }, [enableZoom]);

  const zoomOut = useCallback(() => {
    if (!enableZoom) return;
    setScale((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
      }
      return next;
    });
  }, [enableZoom]);

  // Double click toggles between 1x and 2.5x (only if enableZoom is true)
  const handleDoubleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!enableZoom) return;
    if (scale > 1) {
      resetZoom();
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      setScale(2.5);
      const newPos = { x: -offsetX * 1.5, y: -offsetY * 1.5 };
      setPosition(newPos);
      positionRef.current = newPos;
    }
  };

  // Mouse wheel zoom (only if enableZoom is true)
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (isVideoMode || !enableZoom) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const delta = e.deltaY * -0.003;
    setScale((prev) => {
      const newScale = Math.min(Math.max(Number((prev + delta).toFixed(2)), 1), 6);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
      }
      return newScale;
    });
  };

  // Mouse drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableZoom || scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableZoom || !isDragging || scale <= 1) return;
    hasDraggedRef.current = true;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPosition({ x: newX, y: newY });
    positionRef.current = { x: newX, y: newY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag to pan (mobile/touchpad)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableZoom || scale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: touch.clientX - positionRef.current.x,
      y: touch.clientY - positionRef.current.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableZoom || !isDragging || scale <= 1) return;
    hasDraggedRef.current = true;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStartRef.current.x;
    const newY = touch.clientY - dragStartRef.current.y;
    setPosition({ x: newX, y: newY });
    positionRef.current = { x: newX, y: newY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Lock body scroll and pause ScrollSmoother while Lightbox is open
  useEffect(() => {
    // 1. Pause smoother so background doesn't move or desync
    smoother?.paused(true);

    // 2. Lock body scroll
    const prevOverflow = document.body.style.overflow;
    const prevOverflowY = document.body.style.overflowY;
    document.body.style.overflow = "hidden";
    document.body.style.overflowY = "hidden";

    return () => {
      // 3. Restore body overflow
      document.body.style.overflow = prevOverflow || "";
      document.body.style.overflowY = prevOverflowY || "auto";

      // 4. Resume smoother and refresh ScrollTrigger & ScrollSmoother
      smoother?.paused(false);
      ScrollTrigger.refresh();
      ScrollSmoother.refresh(true);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (enableZoom) {
        if (e.key === "+" || e.key === "=") zoomIn();
        if (e.key === "-") zoomOut();
        if (e.key === "0") resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goToPrev, goToNext, zoomIn, zoomOut, resetZoom, enableZoom]);

  const handleOverlayClick = () => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    onClose();
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={handleOverlayClick}
      onWheel={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
          data-cursor="disable"
        >
          <MdClose />
        </button>

        {/* Left arrow (only for image galleries) */}
        {hasMultiple && (
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={goToPrev}
            aria-label="Previous image"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
        )}

        {/* Content: video or image */}
        <div className="lightbox-image-container" onWheel={handleWheel}>
          {isVideoMode ? (
            <video
              src={asset(video)}
              className="lightbox-video lightbox-image-loaded"
              controls
              autoPlay
              playsInline
            />
          ) : (
            images && (
              <img
                src={asset(images[currentIndex])}
                alt={`Gallery image ${currentIndex + 1}`}
                className={`lightbox-image ${
                  isLoaded ? "lightbox-image-loaded" : ""
                } ${enableZoom && scale > 1 ? "lightbox-image-zoomed" : ""}`}
                style={
                  enableZoom
                    ? {
                        transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                        cursor:
                          scale > 1
                            ? isDragging
                              ? "grabbing"
                              : "grab"
                            : "zoom-in",
                        transition: isDragging
                          ? "none"
                          : "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
                      }
                    : undefined
                }
                onLoad={() => setIsLoaded(true)}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onDoubleClick={handleDoubleClick}
                draggable={false}
              />
            )
          )}
        </div>

        {/* Right arrow (only for image galleries) */}
        {hasMultiple && (
          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={goToNext}
            aria-label="Next image"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>
        )}

        {/* Bottom controls: Zoom toolbar (if enabled) and Counter */}
        {!isVideoMode && (
          <div className="lightbox-controls-bar">
            {enableZoom && (
              <div className="lightbox-zoom-toolbar">
                <button
                  className="lightbox-zoom-btn"
                  onClick={zoomOut}
                  disabled={scale <= 1}
                  title="Zoom Out (-)"
                  data-cursor="disable"
                >
                  <MdZoomOut />
                </button>
                <button
                  className="lightbox-zoom-level"
                  onClick={resetZoom}
                  title="Click to reset (100%)"
                  data-cursor="disable"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  className="lightbox-zoom-btn"
                  onClick={zoomIn}
                  disabled={scale >= 6}
                  title="Zoom In (+)"
                  data-cursor="disable"
                >
                  <MdZoomIn />
                </button>
                {scale > 1 && (
                  <button
                    className="lightbox-zoom-btn lightbox-zoom-reset"
                    onClick={resetZoom}
                    title="Fit to Screen (0)"
                    data-cursor="disable"
                  >
                    <MdFitScreen />
                  </button>
                )}
              </div>
            )}

            {/* Counter */}
            {hasMultiple && (
              <div className="lightbox-counter">
                {currentIndex + 1} / {images!.length}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
