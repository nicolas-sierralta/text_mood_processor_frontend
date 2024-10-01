# AnalyzeResultDisplay

The `AnalyzeResultDisplay` component is responsible for displaying the results of a tone analysis. It renders the detected emotions with their respective percentages and highlights the predominant emotion.

## Props

### `result: { emotions: Emotion[], predominant_emotion: string, confidence: number } | null`
- **emotions**: An array of objects, each containing the name of the emotion and its percentage.
  - `emotion`: A string representing the name of the emotion (e.g., "happy", "sad").
  - `percentage`: A number representing the percentage of the emotion in the analyzed text.
  
- **predominant_emotion**: A string representing the emotion that has the highest percentage in the analysis.

- **confidence**: A number representing the confidence percentage of the analysis for the predominant emotion.

When the `result` prop is `null`, the component returns `null` and nothing is displayed.

### Example of `result` object:

```ts
const result = {
  emotions: [
    { emotion: 'happy', percentage: 60 },
    { emotion: 'neutral', percentage: 30 },
    { emotion: 'sad', percentage: 10 }
  ],
  predominant_emotion: 'happy',
  confidence: 95.6
};
```
## Usage Example
```tsx
import React from 'react';
import { AnalyzeResultDisplay } from './AnalyzeResultDisplay';

const exampleResult = {
  emotions: [
    { emotion: 'happy', percentage: 60 },
    { emotion: 'neutral', percentage: 30 },
    { emotion: 'sad', percentage: 10 }
  ],
  predominant_emotion: 'happy',
  confidence: 95.6
};

const Example = () => {
  return (
    <AnalyzeResultDisplay result={exampleResult} />
  );
};

export default Example;
```
## Emotion Interface
### Emotion
Represents an individual emotion with its corresponding percentage.

```ts
interface Emotion {
  emotion: string;
  percentage: number;
}
```