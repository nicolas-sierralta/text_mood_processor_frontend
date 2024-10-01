import React from 'react';
import { AnalyzeResultProps } from './AnalyzeResultDisplayProps';

/**
 * Component to display the results of a tone analysis.
 * 
 * @component
 * @param {AnalyzeResultProps} props - The props containing the analysis results
 * @returns {JSX.Element | null} AnalyzeResultDisplay component
 */
const AnalyzeResultDisplay: React.FC<AnalyzeResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="relative w-full p-6 mt-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100 transition-all duration-300">
      <h2 className="text-lg font-bold mb-4">Tone Analysis Results</h2>
      <ul className="mb-4">
        {result.emotions.map((emotion, index) => (
          <li key={index} className="flex justify-between">
            <span className="capitalize">{emotion.emotion}</span>
            <span>{emotion.percentage.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">
        Predominant Emotion:{" "}
        <span className="text-blue-500">{result.predominant_emotion}</span>{" "}
        ({result.confidence.toFixed(2)}%)
      </p>
    </div>
  );
};

export default AnalyzeResultDisplay;

