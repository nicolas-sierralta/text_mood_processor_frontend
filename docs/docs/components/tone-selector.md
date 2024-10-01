# ToneSelector

The `ToneSelector` component is a dropdown (select) input that allows the user to choose a tone. The available tones are predefined as "serious", "friendly", and "funny".

## Props

### `selectedTone: string`
The currently selected tone, which is displayed as the value in the dropdown. It is controlled by the parent component.

### `setSelectedTone: (tone: string) => void`
A function that updates the selected tone in the parent component. It is called whenever the user selects a different tone from the dropdown.

## Features

- **Predefined Tones**: The dropdown provides three options for tones:
  - Serious
  - Friendly
  - Funny

- **Default Option**: The first option prompts the user to "Select tone", and it is disabled to ensure that the user picks one of the available tones.

- **Styling**: The component is styled with TailwindCSS classes to ensure a consistent appearance and smooth transitions when the user interacts with it.

## Usage Example

```tsx
import React, { useState } from 'react';
import { ToneSelector } from './ToneSelector';

const Example = () => {
  const [selectedTone, setSelectedTone] = useState('');

  return (
    <div>
      <ToneSelector selectedTone={selectedTone} setSelectedTone={setSelectedTone} />
      <p>Selected Tone: {selectedTone}</p>
    </div>
  );
};

export default Example;
```
In this example, the ToneSelector allows the user to choose a tone from the predefined list. The selectedTone state is updated via the setSelectedTone function whenever the user selects a new tone.
### Tones Array
The tones available in the dropdown are predefined in the component:
```tsx
const tones = ['serious', 'friendly', 'funny'];
```
The tones are rendered as options, and each tone is capitalized before being displayed to the user:
```tsx
<option key={tone} value={tone}>
  {tone.charAt(0).toUpperCase() + tone.slice(1)}
</option>
```
This ensures a user-friendly display while keeping the internal values simple.
### Customization
If you need to extend the list of tones or allow dynamic options, you can modify the tones array or pass it as a prop to the component.