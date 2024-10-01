# useAnalyzeTone

The `useAnalyzeTone` hook is responsible for analyzing the tone of a given text by sending a request to an external API. It returns an asynchronous function `analyzeTone` that performs the analysis and returns the result.

## Functionality

`analyzeTone: (text: string) => Promise<AnalyzeResult | null>`
- **Input**: A string `text` that represents the text to be analyzed.
- **Output**: A `Promise` that resolves to an `AnalyzeResult` object if the request is successful, or `null` if an error occurs.

### API Call
The hook sends a POST request to the tone analysis API using the URL defined in the environment variable `VITE_ANALYZE_TONE_URL`. The request includes the text to be analyzed in the request body.

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: The text to analyze in JSON format.

```ts
const response = await fetch(`${apiUrl}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text }),
});
```
### Error Handling
If the request fails or the server responds with an error status code, an error is thrown and caught in the try-catch block. In case of failure, the function logs the error to the console and returns null.
```ts
if (!response.ok) {
  throw new Error('Error analyzing tone');
}
```
### Usage Example
```tsx
import React, { useState } from 'react';
import useAnalyzeTone from './useAnalyzeTone';

const TextAnalyzer = () => {
  const { analyzeTone } = useAnalyzeTone();
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const text = 'This is a test text.';
    const analysisResult = await analyzeTone(text);
    setResult(analysisResult);
  };

  return (
    <div>
      <button onClick={handleAnalyze}>Analyze Tone</button>
      {result && (
        <div>
          <h3>Analysis Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;
```
### AnalyzeResult Interface
The AnalyzeResult type defines the shape of the response returned by the API. This type is imported from a types file:
```ts
export interface AnalyzeResult {
  emotions: {
    emotion: string;
    percentage: number;
  }[];
  predominant_emotion: string;
  confidence: number;
}
```
In the example above, the analyzeTone function is used to send a text for analysis, and the result is displayed once the promise resolves. If an error occurs, it is logged in the console, and null is returned.

### Environment Variable
The API URL is retrieved from the environment variable VITE_ANALYZE_TONE_URL:
```ts
const apiUrl = import.meta.env.VITE_ANALYZE_TONE_URL;
```
This allows you to configure different API endpoints for different environments (e.g., development, production) without hardcoding the URL into the code.

### Error Handling
If the fetch request fails or an error occurs during the request, the error is logged in the console:
```ts
console.error('Failed to analyze tone:', error);
```
The hook will return null when an error occurs.