/**
 * Represents an emotion with its percentage
 * 
 * @interface Emotion
 * @property {string} emotion - The name of the emotion
 * @property {number} percentage - The percentage of this emotion in the result
 */
export interface Emotion {
    emotion: string;
    percentage: number;
  }
  
  /**
   * Props for the AnalyzeResultDisplay component
   * 
   * @interface AnalyzeResultProps
   * @property {result} result - The result of the analysis, containing emotions, predominant emotion, and confidence
   */
  export interface AnalyzeResultProps {
    result: {
      emotions: Emotion[];
      predominant_emotion: string;
      confidence: number;
    } | null;
  }
  