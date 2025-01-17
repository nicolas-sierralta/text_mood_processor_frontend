import { AnalyzeResult } from '../types';

/**
 * Hook for analyzing the tone of the text
 * 
 * @returns {analyzeTone: (text: string) => Promise<AnalyzeResult | null>}
 */
const useAnalyzeTone = () => {
  const analyzeTone = async (text: string): Promise<AnalyzeResult | null> => {
    try {
      const apiUrl = import.meta.env.VITE_ANALYZE_TONE_URL; // URL desde .env
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error('Error analyzing tone');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to analyze tone:', error);
      return null;
    }
  };

  return { analyzeTone };
};

export default useAnalyzeTone;

