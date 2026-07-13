import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { Position, StepCardProps } from "./types";
import { calculateCardPosition, isVideo } from "./utils";

export default function StepCard({
  step,
  index,
  total,
  onNext,
  onPrevious,
  onFinish,
}: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<Position | null>(null);

  const updatePosition = useCallback(() => {
    if (!cardRef.current) return;

    const pos = calculateCardPosition(step.followId, cardRef.current);

    setPosition(pos);
  }, [step.followId]);

  useLayoutEffect(() => {
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);

  return (
    <div
      ref={cardRef}
      className="tutorial-card"
      style={{
        top: position ? position.top : "50%",
        left: position ? position.left : "50%",
        transform: position ? undefined : "translate(-50%, -50%)",
      }}
    >
      {step.src &&
        (isVideo(step.src) ? (
          <video
            className="tutorial-media"
            src={step.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img className="tutorial-media" src={step.src} alt={step.title} />
        ))}

      <div className="tutorial-content">
        <h2 className="tutorial-title">{step.title}</h2>

        <p className="tutorial-description">{step.description}</p>

        <div className="tutorial-actions">
          <button
            className="tutorial-button tutorial-button-secondary"
            disabled={index === 0}
            onClick={onPrevious}
          >
            Previous
          </button>

          {index === total - 1 ? (
            <button
              className="tutorial-button tutorial-button-primary"
              onClick={onFinish}
            >
              Finish
            </button>
          ) : (
            <button
              className="tutorial-button tutorial-button-primary"
              onClick={onNext}
            >
              Next
            </button>
          )}
        </div>

        <div className="tutorial-progress">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`tutorial-dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
