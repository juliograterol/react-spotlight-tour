"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StepCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("./utils");
function StepCard({ step, index, total, onNext, onPrevious, onFinish, }) {
    const cardRef = (0, react_1.useRef)(null);
    const [position, setPosition] = (0, react_1.useState)(null);
    const updatePosition = (0, react_1.useCallback)(() => {
        if (!cardRef.current)
            return;
        const pos = (0, utils_1.calculateCardPosition)(step.followId, cardRef.current);
        setPosition(pos);
    }, [step.followId]);
    (0, react_1.useLayoutEffect)(() => {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [updatePosition]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: cardRef, className: "tutorial-card", style: {
            top: position ? position.top : "50%",
            left: position ? position.left : "50%",
            transform: position ? undefined : "translate(-50%, -50%)",
        }, children: [step.src &&
                ((0, utils_1.isVideo)(step.src) ? ((0, jsx_runtime_1.jsx)("video", { className: "tutorial-media", src: step.src, autoPlay: true, muted: true, loop: true, playsInline: true })) : ((0, jsx_runtime_1.jsx)("img", { className: "tutorial-media", src: step.src, alt: step.title }))), (0, jsx_runtime_1.jsxs)("div", { className: "tutorial-content", children: [(0, jsx_runtime_1.jsx)("h2", { className: "tutorial-title", children: step.title }), (0, jsx_runtime_1.jsx)("p", { className: "tutorial-description", children: step.description }), (0, jsx_runtime_1.jsxs)("div", { className: "tutorial-actions", children: [(0, jsx_runtime_1.jsx)("button", { className: "tutorial-button tutorial-button-secondary", disabled: index === 0, onClick: onPrevious, children: "Previous" }), index === total - 1 ? ((0, jsx_runtime_1.jsx)("button", { className: "tutorial-button tutorial-button-primary", onClick: onFinish, children: "Finish" })) : ((0, jsx_runtime_1.jsx)("button", { className: "tutorial-button tutorial-button-primary", onClick: onNext, children: "Next" }))] }), (0, jsx_runtime_1.jsx)("div", { className: "tutorial-progress", children: Array.from({ length: total }).map((_, i) => ((0, jsx_runtime_1.jsx)("span", { className: `tutorial-dot ${i === index ? "active" : ""}` }, i))) })] })] }));
}
