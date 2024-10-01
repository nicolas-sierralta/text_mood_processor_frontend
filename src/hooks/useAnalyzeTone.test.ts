import { renderHook, act } from '@testing-library/react'; // Para trabajar con hooks
import { describe, it, expect, vi } from 'vitest'; // Vitest
import useAnalyzeTone from './useAnalyzeTone'; // Importamos el hook

// Mock para la respuesta del servidor
const mockResponse = {
  tone: 'neutral',
  confidence: 0.85,
};

describe('useAnalyzeTone', () => {
  beforeEach(() => {
    // Reseteamos el mock antes de cada test
    vi.clearAllMocks();
  });

  it('returns the tone analysis result on successful request', async () => {
    // Mockeamos el fetch con una respuesta exitosa simulando un objeto Response completo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_ANALYZE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useAnalyzeTone());

    let analyzeResult;

    // Llamamos a la función de análisis
    await act(async () => {
      analyzeResult = await result.current.analyzeTone('This is a test text.');
    });

    // Verificamos que el resultado sea el esperado
    expect(analyzeResult).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));
  });

  it('returns null and logs error when the fetch fails', async () => {
    // Mockeamos un fetch que falla simulando un objeto Response completo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      } as Response)
    );

    // Espiamos en la consola de errores para evitar que se registre en stderr
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_ANALYZE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useAnalyzeTone());

    let analyzeResult;

    // Llamamos a la función de análisis
    await act(async () => {
      analyzeResult = await result.current.analyzeTone('This is a test text.');
    });

    // Verificamos que el resultado sea null debido al error
    expect(analyzeResult).toBeNull();
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));
    expect(consoleSpy).toHaveBeenCalledWith('Failed to analyze tone:', expect.any(Error));

    // Restauramos el console.error
    consoleSpy.mockRestore();
  });

  it('handles network errors correctly', async () => {
    // Mockeamos un fetch que lanza una excepción
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    // Espiamos en la consola de errores para verificar el mensaje
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_ANALYZE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useAnalyzeTone());

    let analyzeResult;

    // Llamamos a la función de análisis
    await act(async () => {
      analyzeResult = await result.current.analyzeTone('This is a test text.');
    });

    // Verificamos que el resultado sea null y que el error haya sido registrado en la consola
    expect(analyzeResult).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to analyze tone:', expect.any(Error));
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));

    // Restauramos el console.error
    consoleSpy.mockRestore();
  });
});


