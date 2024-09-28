import { ChangeToneResult } from '../types';

/**
 * Hook for changing the tone of the text
 * 
 * @returns {changeTone: (text: string, tone: string) => Promise<ChangeToneResult | null>}
 */
const useChangeTone = () => {
    const changeTone = async (text: string, target_tone: string): Promise<ChangeToneResult | null> => {
        try {
          console.log('Payload:', { text, target_tone });
      
          const response = await fetch('http://163.172.191.42:8000/api/change-tone', {
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
          console.error('Failed to change tone:', error);
          return null;
        }
      };
      
      
     
  return { changeTone };
};

export default useChangeTone;
