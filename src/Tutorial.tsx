import { useCallback, useEffect, useRef, useState } from "react";

import StepCard from "./StepCard";

import { TutorialProps } from "./types";

import {
  clearHighlight,
  disableOverlay,
  enableOverlay,
  highlightElement,
} from "./utils";

export default function Tutorial({
  steps,
  defaultOpen = true,
  onClose,
}: TutorialProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const highlightedElement = useRef<HTMLElement | null>(null);

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

    onClose?.();
  }, [onClose, removeCurrentHighlight]);

  /**
   * Apply spotlight whenever the current step changes.
   */
  useEffect(() => {
    if (!open || !currentStep) return;

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

  if (!open) return null;

  if (steps.length === 0) return null;

  return (
    <div
      className="tutorial-container"
      aria-hidden={false}
      role="dialog"
      aria-modal="true"
    >
      <StepCard
        step={currentStep}
        index={currentStepIndex}
        total={steps.length}
        onNext={nextStep}
        onPrevious={previousStep}
        onFinish={closeTutorial}
      />
    </div>
  );
}
