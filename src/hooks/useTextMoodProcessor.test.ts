import { renderHook, act } from '@testing-library/react-hooks';
import { vi } from 'vitest'; // Importa `vi` para hacer el mock
import useTextMoodProcessor from './useTextMoodProcessor';
import { useAnalyzeTone, useChangeTone } from '../hooks';

// Mockea los hooks externos con Vitest
vi.mock('../hooks', () => ({
  useAnalyzeTone: vi.fn().mockReturnValue({ analyzeTone: vi.fn() }),
  useChangeTone: vi.fn().mockReturnValue({ changeTone: vi.fn() }),
}));

describe('useTextMoodProcessor', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('should set the text and selected tone', () => {
    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('Test text');
      result.current.setSelectedTone('friendly');
    });

    expect(result.current.text).toBe('Test text');
    expect(result.current.selectedTone).toBe('friendly');
  });

  it('should call analyzeTone and set analyzeResult', async () => {
    const mockAnalyzeTone = vi.fn().mockResolvedValue({ sentiment: 'positive' });
    (useAnalyzeTone as any).mockReturnValue({ analyzeTone: mockAnalyzeTone });

    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('This is a valid text with more than fifty characters for testing purposes.');
    });

    await act(async () => {
      await result.current.handleAnalyzeTone();
    });

    expect(mockAnalyzeTone).toHaveBeenCalledWith('This is a valid text with more than fifty characters for testing purposes.');
    expect(result.current.analyzeResult).toEqual({ sentiment: 'positive' });
    expect(result.current.changeToneResult).toBeNull();
  });

  it('should not call analyzeTone if text is less than 50 characters', async () => {
    const mockAnalyzeTone = vi.fn();
    (useAnalyzeTone as any).mockReturnValue({ analyzeTone: mockAnalyzeTone });

    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('Short text');
    });

    await act(async () => {
      await result.current.handleAnalyzeTone();
    });

    expect(mockAnalyzeTone).not.toHaveBeenCalled();
  });

  it('should show tone selector when handleChangeTone is called', () => {
    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('This is a valid text with more than fifty characters for testing purposes.');
    });

    act(() => {
      result.current.handleChangeTone();
    });

    expect(result.current.showToneSelector).toBe(true);
  });

  it('should call changeTone and set changeToneResult', async () => {
    const mockChangeTone = vi.fn().mockResolvedValue({ modifiedText: 'Modified text' });
    (useChangeTone as any).mockReturnValue({ changeTone: mockChangeTone });

    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('This is a valid text with more than fifty characters for testing purposes.');
      result.current.setSelectedTone('friendly');
    });

    await act(async () => {
      await result.current.handleAcceptToneChange();
    });

    expect(mockChangeTone).toHaveBeenCalledWith('This is a valid text with more than fifty characters for testing purposes.', 'friendly');
    expect(result.current.changeToneResult).toEqual({ modifiedText: 'Modified text' });
    expect(result.current.analyzeResult).toBeNull();
    expect(result.current.showToneSelector).toBe(false);
  });

  it('should not call changeTone if no tone is selected', async () => {
    const mockChangeTone = vi.fn();
    (useChangeTone as any).mockReturnValue({ changeTone: mockChangeTone });

    const { result } = renderHook(() => useTextMoodProcessor());

    act(() => {
      result.current.setText('This is a valid text with more than fifty characters for testing purposes.');
    });

    await act(async () => {
      await result.current.handleAcceptToneChange();
    });

    expect(mockChangeTone).not.toHaveBeenCalled();
  });
});

