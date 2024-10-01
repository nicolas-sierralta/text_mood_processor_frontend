/**
 * Represents an emotion with its percentage
 * 
 * @interface Emotion
 */
export interface Emotion {
    emotion: string;
    percentage: number;
  }
  
  /**
   * Represents the result of analyzing the tone of the text
   * 
   * @interface AnalyzeResult
   */
  export interface AnalyzeResult {
    emotions: Emotion[];
    predominant_emotion: string;
    confidence: number;
  }
  
  /**
   * Represents the result of changing the tone of the text
   * 
   * @interface ChangeToneResult
   */
  export interface ChangeToneResult {
    original_text: string;
    modified_text: string;
    applied_tone: string;
  }
  