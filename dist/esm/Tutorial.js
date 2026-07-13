import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import StepCard from "./StepCard";
import { clearHighlight, disableOverlay, enableOverlay, highlightElement, } from "./utils";
export default function Tutorial({ steps, defaultOpen = true, onClose, }) {
    const [open, setOpen] = useState(defaultOpen);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const highlightedElement = useRef(null);
    const currentStep = steps[currentStepIndex];
    /**
     * Remove highlight from previous element.
     */
    const removeCurrentHighlight = useCallback(() => {
        clearHighlight(highlightedElement.current);
        highlightedElement.current = null;
    }, []);
    /**
     * Close tutorial.
     */
    const closeTutorial = useCallback(() => {
        removeCurrentHighlight();
        disableOverlay();
        setOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose, removeCurrentHighlight]);
    /**
     * Apply spotlight whenever the current step changes.
     */
    useEffect(() => {
        if (!open || !currentStep)
            return;
        enableOverlay();
        removeCurrentHighlight();
        highlightedElement.current = highlightElement(currentStep.followId);
        return () => {
            removeCurrentHighlight();
        };
    }, [open, currentStep, removeCurrentHighlight]);
    /**
     * Cleanup on unmount.
     */
    useEffect(() => {
        return () => {
            removeCurrentHighlight();
            disableOverlay();
        };
    }, [removeCurrentHighlight]);
    const nextStep = () => {
        if (currentStepIndex === steps.length - 1) {
            closeTutorial();
            return;
        }
        setCurrentStepIndex((current) => current + 1);
    };
    const previousStep = () => {
        setCurrentStepIndex((current) => Math.max(current - 1, 0));
    };
    if (!open)
        return null;
    if (steps.length === 0)
        return null;
    return (_jsx("div", { className: "tutorial-container", "aria-hidden": false, role: "dialog", "aria-modal": "true", children: _jsx(StepCard, { step: currentStep, index: currentStepIndex, total: steps.length, onNext: nextStep, onPrevious: previousStep, onFinish: closeTutorial }) }));
}
