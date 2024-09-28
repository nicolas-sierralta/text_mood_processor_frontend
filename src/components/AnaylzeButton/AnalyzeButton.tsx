import React from 'react';
import { AnalyzeButtonProps } from './AnalyzeButtonProps'; 

/**
 * A button component that triggers the analysis of tone.
 * 
 * @component
 * @param {AnalyzeButtonProps} props - The props for the button
 * @returns {JSX.Element} AnalyzeButton component
 */
const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onAnalyze, disabled, className }) => {
  return (
    <button
      onClick={onAnalyze}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Analyze Tone
    </button>
  );
};

export default AnalyzeButton;



