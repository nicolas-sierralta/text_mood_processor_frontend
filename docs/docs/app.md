# main

The `App` component is the main container for the **Text Mood Processor** application. It manages the input of text, performs tone analysis, and handles tone changes using several UI components and custom hooks.

## Features

- **Text Input**: Allows the user to input text for analysis.
- **Tone Analysis**: Analyzes the mood of the text and displays the result.
- **Tone Change**: Allows the user to select a different tone and modify the text.
- **UI Components**: Displays buttons, text area, and results, and includes a modal for tone selection.

## Components Used

### `TextAreaInput`
A component that renders a textarea for the user to input text. It includes character count and validation to ensure the text length is appropriate for analysis or tone change.

### `AnalyzeButton`
A button component that triggers the tone analysis when clicked. It is disabled until the user enters at least 50 characters in the text area.

### `ChangeToneButton`
A button component that triggers the tone change process. Like the `AnalyzeButton`, it is disabled until at least 50 characters are entered in the text area.

### `AnalyzeResultDisplay`
Displays the results of the tone analysis, including the detected emotions and the predominant emotion.

### `ChangeToneResultDisplay`
Displays the results after the tone change, showing the modified text and the applied tone.

### `ToneSelector`
A dropdown component that allows the user to select a new tone for modifying the text. It appears in a modal when the user opts to change the tone.

## Hooks Used

### `useTextMoodProcessor`
The custom hook that manages all the state and logic for the text mood processing, including:
- `text`: The text entered by the user.
- `selectedTone`: The tone selected by the user for modification.
- `analyzeResult`: The result of the tone analysis.
- `changeToneResult`: The result of the tone change.
- `showToneSelector`: A boolean that controls the visibility of the tone selector modal.

### Key functions from `useTextMoodProcessor`:
- `handleAnalyzeTone`: Triggers the tone analysis when the user clicks the `AnalyzeButton`.
- `handleChangeTone`: Shows the tone selector modal when the user clicks the `ChangeToneButton`.
- `handleAcceptToneChange`: Applies the selected tone to the text when the user clicks the "Accept" button in the tone selector modal.

## UI Layout

### Main Layout
The `App` component uses a flexbox layout to center the content. The main container has padding and a max-width to ensure responsiveness. The background is styled with a gradient that spans from purple to pink for a visually appealing design.

### Buttons
Two buttons are rendered below the textarea input:
- **Analyze Tone** button: Triggers the tone analysis when clicked.
- **Change Tone** button: Opens the modal to select a new tone.

The buttons are styled using TailwindCSS for a modern UI design, with hover effects and smooth transitions.

### Tone Selector Modal
When the user clicks "Change Tone", a modal is displayed over the content, allowing the user to select a new tone for the text. The modal has two buttons:
- **Accept**: Applies the selected tone.
- **Cancel**: Closes the modal without changing the tone.

## Footer

A footer is included at the bottom of the app with simple copyright information.

### Conclusion
The App component integrates various UI components and hooks to create a cohesive experience for analyzing and modifying the tone of text. It is built with **React**, **TypeScript**, **TailwindCSS**, and relies on custom hooks for managing the tone processing logic.