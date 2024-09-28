import { renderHook, act } from '@testing-library/react'; // Para trabajar con hooks
import { describe, it, expect, vi } from 'vitest'; // Vitest
import useChangeTone from './useChangeTone'; // Importamos el hook

// Mock para la respuesta del servidor
const mockResponse = {
  modifiedText: 'This is the modified text.',
  tone: 'formal',
};

describe('useChangeTone', () => {
  beforeEach(() => {
    // Reseteamos el mock antes de cada test
    vi.clearAllMocks();
  });

  it('returns the changed tone result on successful request', async () => {
    // Mockeamos el fetch con una respuesta exitosa simulando un objeto Response completo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: 'OK',
        type: 'basic',
        url: '',
        clone: () => ({}),
        body: null,
        bodyUsed: false,
      } as Response)
    );

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_CHANGE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useChangeTone());

    let changeResult;

    // Llamamos a la función de cambio de tono
    await act(async () => {
      changeResult = await result.current.changeTone('This is a test text.', 'formal');
    });

    // Verificamos que el resultado sea el esperado
    expect(changeResult).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));
  });

  it('returns null and logs error when the fetch fails', async () => {
    // Mockeamos un fetch que falla simulando un objeto Response completo
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
        headers: new Headers(),
        redirected: false,
        status: 500,
        statusText: 'Internal Server Error',
        type: 'basic',
        url: '',
        clone: () => ({}),
        body: null,
        bodyUsed: false,
      } as Response)
    );

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_CHANGE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useChangeTone());

    let changeResult;

    // Llamamos a la función de cambio de tono
    await act(async () => {
      changeResult = await result.current.changeTone('This is a test text.', 'formal');
    });

    // Verificamos que el resultado sea null debido al error
    expect(changeResult).toBeNull();
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));
  });

  it('handles network errors correctly', async () => {
    // Mockeamos un fetch que lanza una excepción
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    // Espiamos en la consola de errores para verificar el mensaje
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Usamos el URL desde el .env
    const apiUrl = import.meta.env.VITE_CHANGE_TONE_URL;

    // Renderizamos el hook
    const { result } = renderHook(() => useChangeTone());

    let changeResult;

    // Llamamos a la función de cambio de tono
    await act(async () => {
      changeResult = await result.current.changeTone('This is a test text.', 'formal');
    });

    // Verificamos que el resultado sea null y que el error haya sido registrado en la consola
    expect(changeResult).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to change tone:', expect.any(Error));
    expect(fetch).toHaveBeenCalledWith(apiUrl, expect.any(Object));

    // Restauramos el console.error
    consoleSpy.mockRestore();
  });
});
