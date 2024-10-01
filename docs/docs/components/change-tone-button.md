# ChangeToneButton

The `ChangeToneButton` component is responsible for triggering the tone change functionality. It renders a button that calls the `onChangeTone` function when clicked. The button can also be disabled based on the `disabled` prop.

## Props

### `onChangeTone: () => void`
A function that is called when the button is clicked. It triggers the logic to change the tone of the text.

### `disabled: boolean`
A boolean that controls whether the button is disabled or not. When `true`, the button is disabled and unclickable, with reduced opacity. When `false`, the button is clickable.

### `className?: string`
An optional string that allows additional CSS classes to be passed to the button for styling. It defaults to an empty string.

## Usage Example

```tsx
import React from 'react';
import { ChangeToneButton } from './ChangeToneButton';

const Example = () => {
  const handleChangeTone = () => {
    console.log('Changing tone...');
  };

  return (
    <ChangeToneButton 
      onChangeTone={handleChangeTone} 
      disabled={false} 
      className="p-3 bg-green-500 text-white rounded-lg" 
    />
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