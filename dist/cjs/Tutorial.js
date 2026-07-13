"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tutorial;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StepCard_1 = __importDefault(require("./StepCard"));
const utils_1 = require("./utils");
function Tutorial({ steps, defaultOpen = true, onClose, }) {
    const [open, setOpen] = (0, react_1.useState)(defaultOpen);
    const [currentStepIndex, setCurrentStepIndex] = (0, react_1.useState)(0);
    const highlightedElement = (0, react_1.useRef)(null);
    const currentStep = steps[currentStepIndex];
    /**
     * Remove highlight from previous element.
     */
    const removeCurrentHighlight = (0, react_1.useCallback)(() => {
        (0, utils_1.clearHighlight)(highlightedElement.current);
        highlightedElement.current = null;
    }, []);
    /**
     * Close tutorial.
     */
    const closeTutorial = (0, react_1.useCallback)(() => {
        removeCurrentHighlight();
        (0, utils_1.disableOverlay)();
        setOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose, removeCurrentHighlight]);
    /**
     * Apply spotlight whenever the current step changes.
     */
    (0, react_1.useEffect)(() => {
        if (!open || !currentStep)
            return;
        (0, utils_1.enableOverlay)();
        removeCurrentHighlight();
        highlightedElement.current = (0, utils_1.highlightElement)(currentStep.followId);
        return () => {
            removeCurrentHighlight();
        };
    }, [open, currentStep, removeCurrentHighlight]);
    /**
     * Cleanup on unmount.
     */
    (0, react_1.useEffect)(() => {
        return () => {
            removeCurrentHighlight();
            (0, utils_1.disableOverlay)();
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "tutorial-container", "aria-hidden": false, role: "dialog", "aria-modal": "true", children: (0, jsx_runtime_1.jsx)(StepCard_1.default, { step: currentStep, index: currentStepIndex, total: steps.length, onNext: nextStep, onPrevious: previousStep, onFinish: closeTutorial }) }));
}
