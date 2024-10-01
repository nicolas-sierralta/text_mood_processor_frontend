# useChangeTone

The `useChangeTone` hook is responsible for changing the tone of a given text by sending a request to an external API. It returns an asynchronous function `changeTone` that performs the tone modification and returns the result.

## Functionality

`changeTone: (text: string, target_tone: string) => Promise<ChangeToneResult | null>`
- **Input**:
  - `text`: A string that represents the text to be modified.
  - `target_tone`: A string that specifies the desired tone (e.g., "friendly", "serious", "funny").
  
- **Output**: A `Promise` that resolves to a `ChangeToneResult` object if the request is successful, or `null` if an error occurs.

### API Call
The hook sends a POST request to the tone modification API using the URL defined in the environment variable `VITE_CHANGE_TONE_URL`. The request includes the text and the target tone in the request body.

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: The text and the desired target tone in JSON format.

```ts
const response = await fetch(`${apiUrl}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text, target_tone }),
});
```
### Error Handling
If the request fails or the server responds with an error status code, an error is thrown and caught in the try-catch block. The function logs the error to the console and returns null.
```ts
if (!response.ok) {
  throw new Error(`Error: ${response.status}`);
}
```
In case of an error, the hook captures the error message, checks if the error is an instance of Error, and logs the appropriate message.
```ts
const errorMessage = error instanceof Error ? error.message : 'Unknown error';
console.error('Failed to change tone:', errorMessage);
```
### Usage Example
```tsx
import React, { useState } from 'react';
import useChangeTone from './useChangeTone';

const TextToneChanger = () => {
  const { changeTone } = useChangeTone();
  const [result, setResult] = useState(null);

  const handleChangeTone = async () => {
    const text = 'This is a test text.';
    const tone = 'friendly';
    const changeResult = await changeTone(text, tone);
    setResult(changeResult);
  };

  return (
    <div>
      <button onClick={handleChangeTone}>Change Tone</button>
      {result && (
        <div>
          <h3>Change Tone Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TextToneChanger;
```
### ChangeToneResult Interface
The ChangeToneResult type defines the shape of the response returned by the API after modifying the tone. This type is imported from a types file:
```ts
export interface ChangeToneResult {
  original_text: string;
  modified_text: string;
  applied_tone: string;
}
```
In the example above, the changeTone function sends a request to modify the tone of a text, and the result is displayed once the promise resolves. If an error occurs, it is logged in the console, and null is returned.

### Environment Variable
The API URL is retrieved from the environment variable VITE_CHANGE_TONE_URL:
```ts
const apiUrl = import.meta.env.VITE_CHANGE_TONE_URL;
```
This allows you to configure different API endpoints for different environments (e.g., development, production) without hardcoding the URL into the code.
### Error Handling
If the fetch request fails or an error occurs during the request, the error is logged in the console:
```ts
console.error('Failed to change tone:', errorMessage);
```
The hook will return null when an error occurs.