import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  
import { describe, it, expect, vi, afterEach } from 'vitest';
import AnalyzeButton from './AnalyzeButton';

describe('AnalyzeButton', () => {
  const mockOnAnalyze = vi.fn(); 

  const defaultProps = {
    onAnalyze: mockOnAnalyze,
    disabled: false,
    className: 'btn-primary',
  };

  afterEach(() => {
    vi.clearAllMocks();  
  });

  it('renders the AnalyzeButton component', () => {
    render(<AnalyzeButton {...defaultProps} />);
    
    const buttonElement = screen.getByRole('button', { name: /analyze tone/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn-primary');
  });

  it('triggers onAnalyze when clicked', () => {
    render(<AnalyzeButton {...defaultProps} />);
    
    const buttonElement = screen.getByRole('button', { name: /analyze tone/i });
    fireEvent.click(buttonElement);
    
    expect(mockOnAnalyze).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<AnalyzeButton {...defaultProps} disabled={true} />);
    
    const buttonElement = screen.getByRole('button', { name: /analyze tone/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50');
  });

  it('does not trigger onAnalyze when disabled', () => {
    render(<AnalyzeButton {...defaultProps} disabled={true} />);
    
    const buttonElement = screen.getByRole('button', { name: /analyze tone/i });
    fireEvent.click(buttonElement);
    
    expect(mockOnAnalyze).not.toHaveBeenCalled();
  });
});


