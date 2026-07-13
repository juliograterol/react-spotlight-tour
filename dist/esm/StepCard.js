import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { calculateCardPosition, isVideo } from "./utils";
export default function StepCard({ step, index, total, onNext, onPrevious, onFinish, }) {
    const cardRef = useRef(null);
    const [position, setPosition] = useState(null);
    const updatePosition = useCallback(() => {
        if (!cardRef.current)
            return;
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
    return (_jsxs("div", { ref: cardRef, className: "tutorial-card", style: {
            top: position ? position.top : "50%",
            left: position ? position.left : "50%",
            transform: position ? undefined : "translate(-50%, -50%)",
        }, children: [step.src &&
                (isVideo(step.src) ? (_jsx("video", { className: "tutorial-media", src: step.src, autoPlay: true, muted: true, loop: true, playsInline: true })) : (_jsx("img", { className: "tutorial-media", src: step.src, alt: step.title }))), _jsxs("div", { className: "tutorial-content", children: [_jsx("h2", { className: "tutorial-title", children: step.title }), _jsx("p", { className: "tutorial-description", children: step.description }), _jsxs("div", { className: "tutorial-actions", children: [_jsx("button", { className: "tutorial-button tutorial-button-secondary", disabled: index === 0, onClick: onPrevious, children: "Previous" }), index === total - 1 ? (_jsx("button", { className: "tutorial-button tutorial-button-primary", onClick: onFinish, children: "Finish" })) : (_jsx("button", { className: "tutorial-button tutorial-button-primary", onClick: onNext, children: "Next" }))] }), _jsx("div", { className: "tutorial-progress", children: Array.from({ length: total }).map((_, i) => (_jsx("span", { className: `tutorial-dot ${i === index ? "active" : ""}` }, i))) })] })] }));
}
