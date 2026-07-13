"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIGHLIGHT_CLASS = exports.STYLE_ID = exports.BODY_CLASS = void 0;
exports.ensureGlobalStyles = ensureGlobalStyles;
exports.enableOverlay = enableOverlay;
exports.disableOverlay = disableOverlay;
exports.highlightElement = highlightElement;
exports.clearHighlight = clearHighlight;
exports.isVideo = isVideo;
exports.calculateCardPosition = calculateCardPosition;
exports.BODY_CLASS = "__tutorial_overlay__";
exports.STYLE_ID = "__tutorial_overlay_style__";
exports.HIGHLIGHT_CLASS = "__tutorial_highlight__";
/**
 * Inject the package styles into the document only once.
 */
function ensureGlobalStyles() {
    if (typeof document === "undefined")
        return;
    if (document.getElementById(exports.STYLE_ID))
        return;
    const style = document.createElement("style");
    style.id = exports.STYLE_ID;
    style.innerHTML = `
    body.${exports.BODY_CLASS}::after{
      content:"";
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.72);
      z-index:9998;
      pointer-events:none;
    }

    .${exports.HIGHLIGHT_CLASS}{
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
function enableOverlay() {
    if (typeof document === "undefined")
        return;
    ensureGlobalStyles();
    document.body.classList.add(exports.BODY_CLASS);
}
/**
 * Removes the page overlay.
 */
function disableOverlay() {
    if (typeof document === "undefined")
        return;
    document.body.classList.remove(exports.BODY_CLASS);
}
/**
 * Adds the spotlight effect to an element.
 */
function highlightElement(followId) {
    if (typeof document === "undefined")
        return null;
    if (!followId)
        return null;
    const element = document.getElementById(followId);
    if (!element)
        return null;
    element.classList.add(exports.HIGHLIGHT_CLASS);
    return element;
}
/**
 * Removes the spotlight from an element.
 */
function clearHighlight(element) {
    if (!element)
        return;
    element.classList.remove(exports.HIGHLIGHT_CLASS);
}
/**
 * Determines whether a source should render as a video.
 */
function isVideo(src) {
    if (!src)
        return false;
    return src.endsWith(".mp4") || src.includes(".mp4");
}
/**
 * Calculates where the tutorial card should appear.
 */
function calculateCardPosition(followId, card) {
    if (!followId)
        return null;
    const target = document.getElementById(followId);
    if (!target)
        return null;
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
