# AnalyzeButton

The `AnalyzeButton` component is responsible for triggering the tone analysis process. It renders a button that calls the `onAnalyze` function when clicked. The button can also be disabled based on the `disabled` prop.

## Props

### `onAnalyze: () => void`
A function that is called when the button is clicked. It triggers the tone analysis logic.

### `disabled: boolean`
A boolean that controls whether the button is disabled or not. When `true`, the button is disabled and unclickable, with reduced opacity. When `false`, the button is clickable.

### `className?: string`
An optional string that allows additional CSS classes to be passed to the button for styling. It defaults to an empty string.

## Usage Example

```tsx
import React from 'react';
import { AnalyzeButton } from './AnalyzeButton';

const Example = () => {
  const handleAnalyze = () => {
    console.log('Analyzing tone...');
  };

  return (
    <AnalyzeButton 
      onAnalyze={handleAnalyze} 
      disabled={false} 
      className="p-3 bg-blue-500 text-white rounded-lg" 
    />
  );
};

export default Example;
```

In this example, the AnalyzeButton is rendered with custom styling and is clickable. When clicked, it calls the handleAnalyze function and logs the message "Analyzing tone...".