import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importa matchers personalizados
import ChangeToneButton from './ChangeToneButton';
import { ChangeToneButtonProps } from './ChangeToneButtonProps';
import { describe, it, expect, afterEach, vi } from 'vitest'; // Importa desde Vitest

describe('ChangeToneButton', () => {
  const mockOnChangeTone = vi.fn(); // Función simulada usando vi

  const defaultProps: ChangeToneButtonProps = {
    onChangeTone: mockOnChangeTone,
    disabled: false,
    className: 'btn-primary',
  };

  afterEach(() => {
    vi.clearAllMocks(); // Limpiar mocks después de cada test
  });

  it('renders correctly with the provided className', () => {
    render(<ChangeToneButton {...defaultProps} />);
    
    const buttonElement = screen.getByRole('button', { name: /change tone/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn-primary');
  });

  it('triggers onChangeTone when clicked', () => {
    render(<ChangeToneButton {...defaultProps} />);
    
    const buttonElement = screen.getByRole('button', { name: /change tone/i });
    fireEvent.click(buttonElement);
    
    expect(mockOnChangeTone).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<ChangeToneButton {...defaultProps} disabled={true} />);
    
    const buttonElement = screen.getByRole('button', { name: /change tone/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50');
  });

  it('does not trigger onChangeTone when disabled', () => {
    render(<ChangeToneButton {...defaultProps} disabled={true} />);
    
    const buttonElement = screen.getByRole('button', { name: /change tone/i });
    fireEvent.click(buttonElement);
    
    expect(mockOnChangeTone).not.toHaveBeenCalled();
  });
});

