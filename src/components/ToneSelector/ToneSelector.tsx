import React from 'react';
import { ToneSelectorProps } from './ToneSelectorProps';

/**
 * A dropdown selector component to choose a tone.
 * 
 * @component
 * @param {ToneSelectorProps} props - The props containing the selected tone and setter function
 * @returns {JSX.Element} ToneSelector component
 */
const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, setSelectedTone }) => {
  const tones = ['serious', 'friendly', 'funny'];

  return (
    <select
      className="w-full p-3 mt-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      value={selectedTone}
      onChange={(e) => setSelectedTone(e.target.value)}
    >
      <option value="" disabled>Select tone</option>
      {tones.map((tone) => (
        <option key={tone} value={tone}>
          {tone.charAt(0).toUpperCase() + tone.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ToneSelector;

