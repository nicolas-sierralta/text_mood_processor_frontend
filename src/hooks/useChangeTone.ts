import { ChangeToneResult } from '../types';

/**
 * Hook for changing the tone of the text
 * 
 * @returns {changeTone: (text: string, tone: string) => Promise<ChangeToneResult | null>}
 */
const useChangeTone = () => {
  const changeTone = async (text: string, target_tone: string): Promise<ChangeToneResult | null> => {
    try {
      const apiUrl = import.meta.env.VITE_CHANGE_TONE_URL; // URL desde .env

      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, target_tone }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // Hacemos un cast del error a 'Error' si sabemos que el error será de tipo Error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to change tone:', errorMessage);
      return null;
    }
  };

  return { changeTone };
};

export default useChangeTone;