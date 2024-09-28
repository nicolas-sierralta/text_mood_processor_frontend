import { renderHook, act } from '@testing-library/react-hooks'; // Para trabajar con hooks
import { describe, it, expect, vi } from 'vitest'; // Vitest
import useTextMoodProcessor from './useTextMoodProcessor'; // Importamos el hook

// Mock para la respuesta del servidor
const mockAnalyzeResponse = {
  emotions: [{ joy: 0.8, sadness: 0.2 }],
};

const mockChangeToneResponse = {
  modifiedText: 'This is the modified text.',
  tone: 'formal',
};

describe('useTextMoodProcessor', () => {
  beforeEach(() => {
    // Reseteamos los mocks antes de cada test
    vi.clearAllMocks();
  });

  it('should analyze tone when text length is >= 50 characters', async () => {
    // Mockeamos el fetch para análisis del tono
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve(mockAnalyzeResponse),
        headers: new Headers(),
        redirected: false,
        url: '',
        clone: () => ({}),
        body: null,
        bodyUsed: false,
      } as Response)
    );

    const { result } = renderHook(() => useTextMoodProcessor());

    // Actualizamos el texto con más de 50 caracteres
    await act(async () => {
      result.current.setText('This is a test text that contains more than fifty characters for testing.');
      await result.current.handleAnalyzeTone();
    });

    expect(result.current.analyzeResult).toEqual(mockAnalyzeResponse);
  });

  it('should not analyze tone when text length is < 50 characters', async () => {
    // Mockeamos el fetch para análisis del tono
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve(mockAnalyzeResponse),
        headers: new Headers(),
        redirected: false,
        url: '',
        clone: () => ({}),
        body: null,
        bodyUsed: false,
      } as Response)
    );

    const { result } = renderHook(() => useTextMoodProcessor());

    // Actualizamos el texto con menos de 50 caracteres
    await act(async () => {
      result.current.setText('Short text.');
      await result.current.handleAnalyzeTone();
    });

    // Verificamos que el resultado no haya sido actualizado
    expect(result.current.analyzeResult).toBeNull();
  });

  it('should show tone selector when handleChangeTone is called with text >= 50 characters', async () => {
    const { result } = renderHook(() => useTextMoodProcessor());

    await act(() => {
      result.current.setText('This is a test text that contains more than fifty characters.');
      result.current.handleChangeTone();
    });

    expect(result.current.showToneSelector).toBe(true);
  });

  it('should accept tone change and update changeToneResult', async () => {
    // Mockeamos el fetch para cambiar el tono
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve(mockChangeToneResponse),
        headers: new Headers(),
        redirected: false,
        url: '',
        clone: () => ({}),
        body: null,
        bodyUsed: false,
      } as Response)
    );

    const { result } = renderHook(() => useTextMoodProcessor());

    await act(async () => {
      result.current.setText('This is a test text that contains more than fifty characters.');
      result.current.setSelectedTone('formal');
      await result.current.handleAcceptToneChange();
    });

    expect(result.current.changeToneResult).toEqual(mockChangeToneResponse);
  });

  it('should not accept tone change if no tone is selected', async () => {
    const { result } = renderHook(() => useTextMoodProcessor());

    await act(async () => {
      result.current.setText('This is a test text that contains more than fifty characters.');
      await result.current.handleAcceptToneChange();
    });

    expect(result.current.changeToneResult).toBeNull();
  });
});

