# TextAreaInput

The `TextAreaInput` component is responsible for providing a text input area with a character counter and validation messages. It ensures that the user cannot input more than 500 characters and provides feedback for the minimum character requirement.

## Props

### `text: string`
The current value of the text entered by the user.

### `setText: (text: string) => void`
A function to update the value of the text. It is called whenever the user types in the textarea, provided that the length of the input is 500 characters or less.

## Features

- **Character Counter**: A counter is displayed in the bottom-right corner of the textarea, showing how many characters the user has typed, with a maximum limit of 500 characters.

- **Validation Messages**:
  - If the text contains fewer than 50 characters, a message is displayed indicating that at least 50 characters are required for certain actions (like enabling buttons).
  - Another message encourages the user to enter more than 300 characters for better analysis accuracy.

## Usage Example

```tsx
import React, { useState } from 'react';
import { TextAreaInput } from './TextAreaInput';

const Example = () => {
  const [text, setText] = useState('');

  return (
    <div>
      <TextAreaInput text={text} setText={setText} />
      {/* Additional components can use the text state here */}
    </div>
  );
};

export default Example;
```
In this example, the TextAreaInput component is used to handle user input. The text state is updated via the setText function, and the component displays the input text along with a character counter and validation messages.

### Character Limitation
- The input field is limited to 500 characters. The setText function ensures that no more characters are added once the limit is reached:
```tsx
if (e.target.value.length <= 500) {
  setText(e.target.value);
}
```
This limitation prevents the user from entering more than 500 characters and is visually indicated by the character counter.
### Validation
Two validation messages are displayed:

1. **Minimum 50 characters**: A message in red indicates that at least 50 characters are needed for the buttons to function.
2. **More precise analysis with 300+ characters**: A message suggests that text analysis results will be more accurate when more than 300 characters are provided.