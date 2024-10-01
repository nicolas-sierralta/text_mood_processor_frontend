/**
 * Props for the TextAreaInput component
 * 
 * @interface TextAreaInputProps
 * @property {string} text - The text entered in the textarea
 * @property {(text: string) => void} setText - Function to set the text in the parent component
 */
export interface TextAreaInputProps {
    text: string;
    setText: (text: string) => void;
  }
  