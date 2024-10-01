import { render, act } from '@testing-library/react';
import { vi } from 'vitest';
import useTextMoodProcessor from './useTextMoodProcessor';
import { useAnalyzeTone, useChangeTone } from '.';

// Mockea los hooks externos con Vitest
vi.mock('../hooks', () => ({
  useAnalyzeTone: vi.fn().mockReturnValue({ analyzeTone: vi.fn() }),
  useChangeTone: vi.fn().mockReturnValue({ changeTone: vi.fn() }),
}));

// Componente de prueba que utiliza el hook
const TestComponent = () => {
  const {
    text,
    setText,
    selectedTone,
    setSelectedTone,
    analyzeResult,
    changeToneResult,
    showToneSelector,
    handleAnalyzeTone,
    handleChangeTone,
    handleAcceptToneChange,
  } = useTextMoodProcessor();

  return (
    <div>
      <button onClick={() => setText('This is a test text with more than fifty characters to trigger the condition.')}>
        Set Text
      </button>
      <button onClick={() => setSelectedTone('friendly')}>Set Tone</button>
      <button onClick={handleAnalyzeTone}>Analyze Tone</button>
      <button onClick={handleChangeTone}>Change Tone</button>
      <button onClick={handleAcceptToneChange}>Accept Tone Change</button>
      <div data-testid="text">{text}</div>
      <div data-testid="selectedTone">{selectedTone}</div>
      {/* Usa la propiedad correcta en AnalyzeResult */}
      <div data-testid="analyzeResult">
        {analyzeResult?.emotions?.map((emotion, index) => (
          <div key={index}>{emotion.emotion}</div>
        ))}
      </div>
      <div data-testid="changeToneResult">{changeToneResult?.modified_text}</div>
      <div data-testid="showToneSelector">{showToneSelector.toString()}</div>
    </div>
  );
};

describe('useTextMoodProcessor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set the text and selected tone', () => {
    const { getByTestId, getByText } = render(<TestComponent />);

    act(() => {
      getByText('Set Text').click();
      getByText('Set Tone').click();
    });

    expect(getByTestId('text').textContent).toBe('This is a test text with more than fifty characters to trigger the condition.');
    expect(getByTestId('selectedTone').textContent).toBe('friendly');
  });

  it('should call analyzeTone and set analyzeResult', async () => {
    const mockAnalyzeTone = vi.fn().mockResolvedValue({
      emotions: [{ emotion: 'positive', percentage: 80 }],
    });
    (useAnalyzeTone as any).mockReturnValue({ analyzeTone: mockAnalyzeTone });

    const { getByTestId, getByText } = render(<TestComponent />);

    act(() => {
      getByText('Set Text').click();
    });

    await act(async () => {
      getByText('Analyze Tone').click();
    });

    expect(mockAnalyzeTone).toHaveBeenCalledWith('This is a test text with more than fifty characters to trigger the condition.');
    expect(getByTestId('analyzeResult').textContent).toBe('positive');
    expect(getByTestId('changeToneResult').textContent).toBe('');
  });

  it('should show tone selector when handleChangeTone is called', () => {
    const { getByTestId, getByText } = render(<TestComponent />);
  
    act(() => {
      // Cambia el texto a uno que tenga más de 50 caracteres
      getByText('Set Text').click();
    });
  
    act(() => {
      getByText('Change Tone').click();
    });
  
    // Esperamos que el showToneSelector cambie a true
    expect(getByTestId('showToneSelector').textContent).toBe('true');
  });
  

  it('should call changeTone and set changeToneResult', async () => {
    const mockChangeTone = vi.fn().mockResolvedValue({ modified_text: 'Modified text' });
    (useChangeTone as any).mockReturnValue({ changeTone: mockChangeTone });

    const { getByTestId, getByText } = render(<TestComponent />);

    act(() => {
      getByText('Set Text').click();
      getByText('Set Tone').click();
    });

    await act(async () => {
      getByText('Accept Tone Change').click();
    });

    expect(mockChangeTone).toHaveBeenCalledWith('This is a test text with more than fifty characters to trigger the condition.', 'friendly');
    expect(getByTestId('changeToneResult').textContent).toBe('Modified text');
    expect(getByTestId('analyzeResult').textContent).toBe('');
    expect(getByTestId('showToneSelector').textContent).toBe('false');
  });

  it('should not call changeTone if no tone is selected', async () => {
    const mockChangeTone = vi.fn();
    (useChangeTone as any).mockReturnValue({ changeTone: mockChangeTone });

    const { getByText } = render(<TestComponent />);

    act(() => {
      getByText('Set Text').click();
    });

    await act(async () => {
      getByText('Accept Tone Change').click();
    });

    expect(mockChangeTone).not.toHaveBeenCalled();
  });
});

