import React from 'react';
import { TextAreaInputProps } from './TextAreaInputProps';

/**
 * A textarea input component for entering text, with a character counter and validation messages.
 * 
 * @component
 * @param {TextAreaInputProps} props - The props containing the text and setter function
 * @returns {JSX.Element} TextAreaInput component
 */
const TextAreaInput: React.FC<TextAreaInputProps> = ({ text, setText }) => {

  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= 500) {
            setText(e.target.value);
          }
        }}
        className="w-full h-40 p-4 border rounded-lg resize-none border-black"
        placeholder="Enter your text here..."
      />
      
      {/* Contador de caracteres */}
      <span className="absolute bottom-2 right-2 text-sm text-gray-600">
        {text.length} / 500
      </span>

      {/* Aviso de mínimo 50 caracteres */}
      <p className="mt-2 text-sm text-red-600">
        You need at least 50 characters for the buttons to work.
      </p>

      {/* Aviso de mayor precisión con más de 300 caracteres */}
      <p className="text-sm text-red-600">
        The analysis is more precise with 300+ characters.
      </p>
    </div>
  );
};

export default TextAreaInput;




