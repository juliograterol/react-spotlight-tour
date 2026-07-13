import { Position } from "./types";
export declare const BODY_CLASS = "__tutorial_overlay__";
export declare const STYLE_ID = "__tutorial_overlay_style__";
export declare const HIGHLIGHT_CLASS = "__tutorial_highlight__";
/**
 * Inject the package styles into the document only once.
 */
export declare function ensureGlobalStyles(): void;
/**
 * Enables the page overlay.
 */
export declare function enableOverlay(): void;
/**
 * Removes the page overlay.
 */
export declare function disableOverlay(): void;
/**
 * Adds the spotlight effect to an element.
 */
export declare function highlightElement(followId?: string): HTMLElement | null;
/**
 * Removes the spotlight from an element.
 */
export declare function clearHighlight(element: HTMLElement | null): void;
/**
 * Determines whether a source should render as a video.
 */
export declare function isVideo(src?: string): boolean;
/**
 * Calculates where the tutorial card should appear.
 */
export declare function calculateCardPosition(followId: string | undefined, card: HTMLDivElement): Position | null;
