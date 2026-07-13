export interface Step {
  /**
   * ID of the element that should be highlighted.
   * If omitted, the step card will be centered.
   */
  followId?: string;

  /**
   * Step title.
   */
  title: string;

  /**
   * Step description.
   */
  description: string;

  /**
   * Optional image or video.
   * .mp4 files are rendered as <video>,
   * everything else as <img>.
   */
  src?: string;
}

export interface TutorialProps {
  /**
   * Tutorial steps.
   */
  steps: Step[];

  /**
   * Whether the tutorial starts opened.
   * @default true
   */
  defaultOpen?: boolean;

  /**
   * Called when the tutorial finishes.
   */
  onClose?: () => void;
}

export interface StepCardProps {
  step: Step;

  index: number;

  total: number;

  onNext(): void;

  onPrevious(): void;

  onFinish(): void;
}

export interface Position {
  top: number;
  left: number;
}
