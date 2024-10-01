# ChangeToneResultDisplay

The `ChangeToneResultDisplay` component is responsible for displaying the results of a tone change. It shows the original text, the modified text after the tone change, and the applied tone.

## Props

### `result: { original_text: string, modified_text: string, applied_tone: string } | null`
- **original_text**: A string representing the original text before the tone was changed.
- **modified_text**: A string representing the text after the tone change.
- **applied_tone**: A string representing the tone that was applied to modify the text.

When the `result` prop is `null`, the component returns `null` and nothing is displayed.

### Example of `result` object:

```ts
const result = {
  original_text: "I am not happy.",
  modified_text: "I am thrilled!",
  applied_tone: "positive"
};
```

## Usage Example
```tsx
import React from 'react';
import { ChangeToneResultDisplay } from './ChangeToneResultDisplay';

const exampleResult = {
  original_text: "I am not happy.",
  modified_text: "I am thrilled!",
  applied_tone: "positive"
};

const Example = () => {
  return (
    <ChangeToneResultDisplay result={exampleResult} />
  );
};

export default Example;

```
## Features

- **Copy Modified Text**: There is a "Copy" button that allows the user to copy only the modified text to the clipboard. When clicked, the modified text is copied using the browser's navigator.clipboard.writeText method.

```tsx
<button
  onClick={() => navigator.clipboard.writeText(result.modified_text)}
  className="absolute top-2 right-2 text-sm p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
>
  Copy
</button>
```
In this example, the ChangeToneResultDisplay component renders the results of the tone change, including the original text, the modified text, and the applied tone. It also provides a button to copy the modified text.