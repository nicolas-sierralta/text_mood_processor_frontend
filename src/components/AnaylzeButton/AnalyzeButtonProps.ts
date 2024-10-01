/**
 * Props for the AnalyzeButton component
 * 
 * @interface AnalyzeButtonProps
 * @property {() => void} onAnalyze - Function to be called when the analyze button is clicked
 * @property {boolean} disabled - Indicates if the button should be disabled
 * @property {string} [className] - Optional additional CSS classes for the button
 */
export interface AnalyzeButtonProps {
    onAnalyze: () => void;
    disabled: boolean;
    className?: string;
  }
  