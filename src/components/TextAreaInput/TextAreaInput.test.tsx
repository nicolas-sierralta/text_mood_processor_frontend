import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import custom matchers
import TextAreaInput from './TextAreaInput';
import { describe, it, expect, vi } from 'vitest'; // Import from Vitest

describe('TextAreaInput', () => {
  const mockSetText = vi.fn(); // Mock for the setText function
  const mockText = 'Hello, this is a test input'; // Sample text

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it('renders correctly with initial props', () => {
    render(<TextAreaInput text={mockText} setText={mockSetText} />);

    // Check that the textarea is rendered with the correct text
    const textArea = screen.getByPlaceholderText(/enter your text here/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue(mockText);

    // Check that the character counter is displayed correctly
    expect(screen.getByText(`${mockText.length} / 500`)).toBeInTheDocument();

    // Check for the validation message
    expect(screen.getByText(/you need at least 50 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/the analysis is more precise/i)).toBeInTheDocument();
  });

  it('updates the text when typing within the character limit', () => {
    render(<TextAreaInput text={mockText} setText={mockSetText} />);

    const textArea = screen.getByPlaceholderText(/enter your text here/i);
    const newText = 'This is an updated text input.';

    // Simulate typing new text
    fireEvent.change(textArea, { target: { value: newText } });

    // Check if setText is called with the new text
    expect(mockSetText).toHaveBeenCalledWith(newText);
  });

  it('does not allow typing beyond 500 characters', () => {
    render(<TextAreaInput text={mockText} setText={mockSetText} />);

    const textArea = screen.getByPlaceholderText(/enter your text here/i);

    // Simulate typing a string longer than 500 characters
    const longText = 'a'.repeat(501);
    fireEvent.change(textArea, { target: { value: longText } });

    // Ensure setText is not called because the input exceeds 500 characters
    expect(mockSetText).not.toHaveBeenCalledWith(longText);
  });

  it('shows the correct message for inputs shorter than 50 characters', () => {
    const shortText = 'Short text';
    render(<TextAreaInput text={shortText} setText={mockSetText} />);

    // Check that the character counter is correct
    expect(screen.getByText(`${shortText.length} / 500`)).toBeInTheDocument();

    // Check for the validation message about needing at least 50 characters
    expect(screen.getByText(/you need at least 50 characters for the buttons to work/i)).toBeInTheDocument();
  });
});

