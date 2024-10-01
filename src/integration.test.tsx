// src/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should render the title', () => {
    expect(screen.getByText('Text Mood Processor')).toBeInTheDocument();
  });

  it('should enable analyze button when text is 50 characters or more', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'A'.repeat(50) } });

    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    expect(analyzeButton).not.toBeDisabled();
  });

  it('should disable the analyze button when text is less than 50 characters', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'A'.repeat(49) } });

    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    expect(analyzeButton).toBeDisabled();
  });

  it('should disable the change tone button when text is less than 50 characters', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'A'.repeat(49) } });

    const ChangeToneButton = screen.getByRole('button', { name: /change/i });
    expect(ChangeToneButton).toBeDisabled();
  });

  it('should enable change button when text is 50 characters or more', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'A'.repeat(50) } });

    const ChangeToneButton = screen.getByRole('button', { name: /change/i });
    expect(ChangeToneButton).not.toBeDisabled();
  });
});
