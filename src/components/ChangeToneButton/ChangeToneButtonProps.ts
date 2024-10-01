/**
 * Props for the ChangeToneButton component
 * 
 * @interface ChangeToneButtonProps
 * @property {() => void} onChangeTone - Function to be called when the change tone button is clicked
 * @property {boolean} disabled - Indicates if the button should be disabled
 * @property {string} [className] - Optional additional CSS classes for the button
 */
export interface ChangeToneButtonProps {
    onChangeTone: () => void;
    disabled: boolean;
    className?: string;
  }
  