import { AnalyzeResult } from '../types';

/**
 * Hook for analyzing the tone of the text
 * 
 * @returns {analyzeTone: (text: string) => Promise<AnalyzeResult | null>}
 */
const useAnalyzeTone = () => {
  const analyzeTone = async (text: string): Promise<AnalyzeResult | null> => {
    try {
      const response = await fetch('http://163.172.191.42:8000/api/analyze-tone', {
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
