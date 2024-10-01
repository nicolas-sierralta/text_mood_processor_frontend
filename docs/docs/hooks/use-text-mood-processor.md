# useTextMoodProcessor

The `useTextMoodProcessor` hook manages the state and logic for analyzing text mood and changing the tone of the text. It integrates both tone analysis and tone change functionality, providing a cohesive way to handle text mood processing in your application.

## State Variables

### `text: string`
The current value of the text entered by the user. This state is updated through the `setText` function.

### `selectedTone: string`
The currently selected tone for changing the text's mood. This state is updated by the user through the tone selector and can be managed with the `setSelectedTone` function.

### `analyzeResult: AnalyzeResult | null`
The result of the tone analysis. This state is updated when a successful analysis occurs and is reset when the tone is changed.

### `changeToneResult: ChangeToneResult | null`
The result of the tone change. This state is updated when a successful tone change occurs and is reset when a new tone analysis is performed.

### `showToneSelector: boolean`
A boolean flag indicating whether the tone selector should be displayed. This state is used to control the visibility of the tone selector when the user decides to change the tone.

## Functions

### `handleAnalyzeTone: () => Promise<void>`
Initiates the tone analysis process. It checks if the entered text has at least 50 characters before calling the `analyzeTone` function from the `useAnalyzeTone` hook. If the analysis is successful, the result is stored in the `analyzeResult` state, and any previous tone change result is cleared.

### `handleChangeTone: () => void`
Prepares for the tone change process. It checks if the text has at least 50 characters before showing the tone selector by setting the `showToneSelector` state to `true`.

### `handleAcceptToneChange: () => Promise<void>`
Executes the tone change process. It checks if a tone is selected, then calls the `changeTone` function from the `useChangeTone` hook. If the tone change is successful, the result is stored in the `changeToneResult` state, the tone analysis result is cleared, and the tone selector is hidden.

### `setShowToneSelector: (boolean) => void`
A function to manually control the visibility of the tone selector, useful for closing the selector or showing it again based on user interactions.

## Usage Example

```tsx
import React from 'react';
import useTextMoodProcessor from './useTextMoodProcessor';

const TextMoodProcessorComponent = () => {
  const {
    text,
    setText,
    selectedTone,
    setSelectedTone,
    analyzeResult,
    changeToneResult,
    showToneSelector,
    handleAnalyzeTone,
    handleChangeTone,
    handleAcceptToneChange,
    setShowToneSelector
  } = useTextMoodProcessor();

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      
      <button onClick={handleAnalyzeTone} disabled={text.length < 50}>
        Analyze Tone
      </button>
      
      <button onClick={handleChangeTone} disabled={text.length < 50}>
        Change Tone
      </button>
      
      {analyzeResult && <div>{JSON.stringify(analyzeResult)}</div>}
      {changeToneResult && <div>{JSON.stringify(changeToneResult)}</div>}
      
      {showToneSelector && (
        <div>
          <select value={selectedTone} onChange={(e) => setSelectedTone(e.target.value)}>
            <option value="friendly">Friendly</option>
            <option value="serious">Serious</option>
            <option value="funny">Funny</option>
          </select>
          <button onClick={handleAcceptToneChange}>Accept Tone Change</button>
          <button onClick={() => setShowToneSelector(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TextMoodProcessorComponent;
```
### AnalyzeResult and ChangeToneResult Types
The AnalyzeResult and ChangeToneResult types define the structure of the data returned by the respective tone analysis and tone change functions. They are imported from the types file.
```ts
export interface AnalyzeResult {
  emotions: {
    emotion: string;
    percentage: number;
  }[];
  predominant_emotion: string;
  confidence: number;
}

export interface ChangeToneResult {
  original_text: string;
  modified_text: string;
  applied_tone: string;
}
```
## How It Works
1. **Analyze Text Tone:**
- When the user clicks "Analyze Tone", the text is analyzed, and the results are stored in analyzeResult.
- A minimum of 50 characters is required to perform the analysis.

2. **Change Text Tone:**

- When the user clicks "Change Tone", the tone selector is displayed, allowing the user to choose a tone (e.g., friendly, serious, funny).
- Upon accepting the tone change, the modified text and applied tone are stored in changeToneResult.

3. **Interaction:**

- Once the analysis is performed, the result is cleared when the tone is changed.
- The user can toggle the tone selector on and off manually.

### Conclusion
The useTextMoodProcessor hook provides a complete solution for handling text mood analysis and tone changes in a React component. It abstracts the logic for analyzing the text and changing its tone, making it easy to manage the state and interactions in your UI.