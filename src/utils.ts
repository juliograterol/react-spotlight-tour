import { Position } from "./types";

export const BODY_CLASS = "__tutorial_overlay__";
export const STYLE_ID = "__tutorial_overlay_style__";
export const HIGHLIGHT_CLASS = "__tutorial_highlight__";

/**
 * Inject the package styles into the document only once.
 */
export function ensureGlobalStyles() {
  if (typeof document === "undefined") return;

  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");

  style.id = STYLE_ID;

  style.innerHTML = `
    body.${BODY_CLASS}::after{
      content:"";
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.72);
      z-index:9998;
      pointer-events:none;
    }

    .${HIGHLIGHT_CLASS}{
      position:relative !important;
      z-index:9999 !important;
      border-radius:10px;
      box-shadow:0 0 0 9999px rgba(0,0,0,.72);
      transition:box-shadow .25s ease;
    }
  `;

  document.head.appendChild(style);
}

/**
 * Enables the page overlay.
 */
export function enableOverlay() {
  if (typeof document === "undefined") return;

  ensureGlobalStyles();

  document.body.classList.add(BODY_CLASS);
}

/**
 * Removes the page overlay.
 */
export function disableOverlay() {
  if (typeof document === "undefined") return;

  document.body.classList.remove(BODY_CLASS);
}

/**
 * Adds the spotlight effect to an element.
 */
export function highlightElement(followId?: string): HTMLElement | null {
  if (typeof document === "undefined") return null;

  if (!followId) return null;

  const element = document.getElementById(followId);

  if (!element) return null;

  element.classList.add(HIGHLIGHT_CLASS);

  return element;
}

/**
 * Removes the spotlight from an element.
 */
export function clearHighlight(element: HTMLElement | null) {
  if (!element) return;

  element.classList.remove(HIGHLIGHT_CLASS);
}

/**
 * Determines whether a source should render as a video.
 */
export function isVideo(src?: string) {
  if (!src) return false;

  return src.endsWith(".mp4") || src.includes(".mp4");
}

/**
 * Calculates where the tutorial card should appear.
 */
export function calculateCardPosition(
  followId: string | undefined,
  card: HTMLDivElement,
): Position | null {
  if (!followId) return null;

  const target = document.getElementById(followId);

  if (!target) return null;

  const rect = target.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const GAP = 18;
  const PADDING = 16;

  let left = rect.right + GAP;
  let top = rect.top;

  // Overflow right
  if (left + cardRect.width > window.innerWidth - PADDING) {
    left = rect.left - cardRect.width - GAP;
  }

  // Overflow left
  if (left < PADDING) {
    left = PADDING;
  }

  // Overflow bottom
  if (top + cardRect.height > window.innerHeight - PADDING) {
    top = window.innerHeight - cardRect.height - PADDING;
  }

  // Overflow top
  if (top < PADDING) {
    top = PADDING;
  }

  return {
    top,
    left,
  };
}
