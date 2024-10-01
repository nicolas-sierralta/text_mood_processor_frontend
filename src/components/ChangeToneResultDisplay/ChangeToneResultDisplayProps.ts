/**
 * Props for the ChangeToneResultDisplay component
 * 
 * @interface ChangeToneResultProps
 * @property {result} result - The result of the tone change, containing original text, modified text, and applied tone
 */
export interface ChangeToneResultProps {
    result: {
      original_text: string;
      modified_text: string;
      applied_tone: string;
    } | null;
  }
  