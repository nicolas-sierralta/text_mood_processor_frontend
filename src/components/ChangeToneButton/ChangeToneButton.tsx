import React from 'react';
import { ChangeToneButtonProps } from './ChangeToneButtonProps';

/**
 * A button component that triggers the tone change functionality.
 * 
 * @component
 * @param {ChangeToneButtonProps} props - The props for the button
 * @returns {JSX.Element} ChangeToneButton component
 */
const ChangeToneButton: React.FC<ChangeToneButtonProps> = ({ onChangeTone, disabled, className }) => {
  return (
    <button
      onClick={onChangeTone}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Change Tone
    </button>
  );
};

export default ChangeToneButton;

