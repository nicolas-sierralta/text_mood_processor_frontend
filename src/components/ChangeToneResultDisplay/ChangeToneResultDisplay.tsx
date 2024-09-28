import React from 'react';
import { ChangeToneResultProps } from './ChangeToneResultDisplayProps';

/**
 * Component to display the results of a tone change.
 * 
 * @component
 * @param {ChangeToneResultProps} props - The props containing the result of the tone change
 * @returns {JSX.Element | null} ChangeToneResultDisplay component
 */
const ChangeToneResultDisplay: React.FC<ChangeToneResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="relative w-full p-6 mt-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100 transition-all duration-300">
      <h2 className="text-lg font-bold mb-4">Tone Change Results</h2>
      <p>
        <span className="font-semibold">Original Text:</span>{" "}
        <span className="text-gray-700">{result.original_text}</span>
      </p>
      <p className="mt-2">
        <span className="font-semibold">Modified Text:</span>{" "}
        <span className="text-gray-700">{result.modified_text}</span>
      </p>
      <p className="mt-2">
        <span className="font-semibold">Applied Tone:</span>{" "}
        <span className="text-blue-500">{result.applied_tone}</span>
      </p>

      {/* Botón para copiar solo el modified_text */}
      <button
        onClick={() => navigator.clipboard.writeText(result.modified_text)}
        className="absolute top-2 right-2 text-sm p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      >
        Copy
      </button>
    </div>
  );
};

export default ChangeToneResultDisplay;
