import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importa matchers personalizados
import ChangeToneResultDisplay from './ChangeToneResultDisplay';
import { ChangeToneResultProps } from './ChangeToneResultDisplayProps';
import { describe, it, expect, afterEach, beforeAll, vi } from 'vitest'; // Importa desde Vitest

describe('ChangeToneResultDisplay', () => {
  const mockResult: ChangeToneResultProps['result'] = {
    original_text: 'Hello, how are you?',
    modified_text: 'Greetings, how do you do?',
    applied_tone: 'formal',
  };

  beforeAll(() => {
    // Mock para navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(), // Función simulada para escribir texto en el portapapeles
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpiar mocks después de cada test
  });

  it('renders correctly with valid result', () => {
    render(<ChangeToneResultDisplay result={mockResult} />);

    // Verifica que el título se muestra correctamente
    expect(screen.getByText(/tone change results/i)).toBeInTheDocument();

    // Verifica que el texto original se muestra correctamente
    expect(screen.getByText(/original text/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.original_text)).toBeInTheDocument();

    // Verifica que el texto modificado se muestra correctamente
    expect(screen.getByText(/modified text/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.modified_text)).toBeInTheDocument();

    // Verifica que el tono aplicado se muestra correctamente
    expect(screen.getByText(/applied tone/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.applied_tone)).toHaveClass('text-blue-500');
  });

  it('renders null when result is not provided', () => {
    const { container } = render(<ChangeToneResultDisplay result={null} />);
    expect(container.firstChild).toBeNull(); // Asegura que el componente no renderiza nada
  });

  it('copies modified text to clipboard when copy button is clicked', async () => {
    render(<ChangeToneResultDisplay result={mockResult} />);

    // Simula un clic en el botón de copiar
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    // Verifica que el texto se haya copiado al portapapeles
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockResult.modified_text);
  });
});
