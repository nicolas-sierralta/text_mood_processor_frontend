import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import custom matchers
import ToneSelector from './ToneSelector';
import { describe, it, expect, vi } from 'vitest'; // Import from Vitest

describe('ToneSelector', () => {
  const mockSetSelectedTone = vi.fn(); // Mock for the setSelectedTone function
  const mockSelectedTone = ''; // No tone selected initially

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it('renders correctly with default props', () => {
    render(<ToneSelector selectedTone={mockSelectedTone} setSelectedTone={mockSetSelectedTone} />);

    // Check that the select dropdown is rendered
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(''); // No tone selected initially

    // Check that the default disabled option is present
    expect(screen.getByText(/select tone/i)).toBeInTheDocument();

    // Check that all tone options are rendered
    expect(screen.getByText('Serious')).toBeInTheDocument();
    expect(screen.getByText('Friendly')).toBeInTheDocument();
    expect(screen.getByText('Funny')).toBeInTheDocument();
  });

  it('updates selected tone when a tone is selected', () => {
    render(<ToneSelector selectedTone={mockSelectedTone} setSelectedTone={mockSetSelectedTone} />);

    const selectElement = screen.getByRole('combobox');
    
    // Simulate selecting a tone
    fireEvent.change(selectElement, { target: { value: 'funny' } });

    // Check if setSelectedTone is called with the correct value
    expect(mockSetSelectedTone).toHaveBeenCalledWith('funny');
  });

  it('displays the correct selected tone when a tone is provided', () => {
    const mockSelectedTone = 'serious'; // Initially selected tone

    render(<ToneSelector selectedTone={mockSelectedTone} setSelectedTone={mockSetSelectedTone} />);

    // Check that the select dropdown shows the correct selected tone
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(mockSelectedTone);
  });

  it('disables the "Select tone" option when a tone is selected', () => {
    const mockSelectedTone = 'friendly'; // A tone is already selected

    render(<ToneSelector selectedTone={mockSelectedTone} setSelectedTone={mockSetSelectedTone} />);

    // Check that the "Select tone" option is disabled
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(mockSelectedTone);

    // Ensure the user cannot select the disabled "Select tone" option anymore
    const optionElement = screen.getByText(/select tone/i);
    expect(optionElement).toBeDisabled();
  });
});
