/**
 * Props for the ToneSelector component
 * 
 * @interface ToneSelectorProps
 * @property {string} selectedTone - The currently selected tone
 * @property {(tone: string) => void} setSelectedTone - Function to set the selected tone
 */
export interface ToneSelectorProps {
    selectedTone: string;
    setSelectedTone: (tone: string) => void;
  }
  