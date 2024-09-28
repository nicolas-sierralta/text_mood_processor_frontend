import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa matchers personalizados
import TextAreaInput from './TextAreaInput';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'; // Importa desde Vitest

describe('TextAreaInput', () => {
  let setText: vi.Mock;

  beforeEach(() => {
    setText = vi.fn(); // Mock para la función setText
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpiar mocks después de cada test
  });

  it('renders correctly with initial text', () => {
    render(<TextAreaInput text="Hello" setText={setText} />);

    // Verifica que el textarea se renderiza correctamente
    const textArea = screen.getByPlaceholderText(/enter your text here.../i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue('Hello');

    // Verifica el contador de caracteres
    const charCounter = screen.getByText(/5 \/ 500/i);
    expect(charCounter).toBeInTheDocument();

    // Verifica los mensajes de validación
    expect(screen.getByText(/you need at least 50 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/the analysis is more precise with 300\+ characters/i)).toBeInTheDocument();
  });

  it('updates text correctly when typing', () => {
    render(<TextAreaInput text="" setText={setText} />);

    const textArea = screen.getByPlaceholderText(/enter your text here.../i);
    fireEvent.change(textArea, { target: { value: 'Hello, this is a test.' } });

    expect(setText).toHaveBeenCalledWith('Hello, this is a test.'); // Verifica que setText fue llamado correctamente
    expect(textArea).toHaveValue('Hello, this is a test.'); // Verifica que el valor en el textarea se actualiza

    // Verifica el contador de caracteres
    const charCounter = screen.getByText(/29 \/ 500/i); // Cambia el texto esperado según el nuevo valor
    expect(charCounter).toBeInTheDocument();
  });

  it('does not update text if length exceeds 500 characters', () => {
    render(<TextAreaInput text="" setText={setText} />);

    const textArea = screen.getByPlaceholderText(/enter your text here.../i);
    const longText = 'a'.repeat(501); // Texto con 501 caracteres
    fireEvent.change(textArea, { target: { value: longText } });

    expect(setText).not.toHaveBeenCalled(); // Verifica que setText no se llama
    expect(textArea).toHaveValue(''); // Verifica que el textarea sigue vacío
  });

  it('shows the correct character count', () => {
    render(<TextAreaInput text="" setText={setText} />);

    const textArea = screen.getByPlaceholderText(/enter your text here.../i);
    fireEvent.change(textArea, { target: { value: 'Test' } });

    // Verifica el contador de caracteres después de escribir
    const charCounter = screen.getByText((content) => content.includes('4') && content.includes('/ 500'));
    expect(charCounter).toBeInTheDocument();
  });
});
