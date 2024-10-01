import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importa matchers personalizados
import AnalyzeResultDisplay from './AnalyzeResultDisplay';
import { AnalyzeResultProps } from './AnalyzeResultDisplayProps';

describe('AnalyzeResultDisplay', () => {
  const mockResult: AnalyzeResultProps['result'] = {
    emotions: [
      { emotion: 'joy', percentage: 50.12 },
      { emotion: 'sadness', percentage: 30.56 },
      { emotion: 'anger', percentage: 19.32 },
    ],
    predominant_emotion: 'joy',
    confidence: 95.67,
  };

  it('renders correctly with valid result', () => {
    render(<AnalyzeResultDisplay result={mockResult} />);

    // Verifica que el título del análisis de tono se muestra
    const title = screen.getByText(/tone analysis results/i);
    expect(title).toBeInTheDocument();

    // Verifica que las emociones y porcentajes se muestran correctamente
    expect(screen.getByText(/joy/i, { selector: 'span.capitalize' })).toBeInTheDocument();
    expect(screen.getByText('50.12%')).toBeInTheDocument();
    expect(screen.getByText(/sadness/i, { selector: 'span.capitalize' })).toBeInTheDocument();
    expect(screen.getByText('30.56%')).toBeInTheDocument();
    expect(screen.getByText(/anger/i, { selector: 'span.capitalize' })).toBeInTheDocument();
    expect(screen.getByText('19.32%')).toBeInTheDocument();

    // Verifica que la emoción predominante se muestra correctamente
    const predominantEmotion = screen.getByText(/predominant emotion/i);
    expect(predominantEmotion).toBeInTheDocument();

    // Verifica el elemento de emoción predominante
    const joyPredominant = screen.getByText('joy', { selector: 'span.text-blue-500' });
    expect(joyPredominant).toBeInTheDocument();
    expect(joyPredominant).toHaveClass('text-blue-500');

    // Verifica que "95.67%" esté presente en el párrafo
    const confidenceText = screen.getByText((content) => content.includes('95.67') && content.includes('%'));
    expect(confidenceText).toBeInTheDocument();
  });

  it('renders null when result is not provided', () => {
    const { container } = render(<AnalyzeResultDisplay result={null} />);
    expect(container.firstChild).toBeNull(); // Asegura que el componente no renderiza nada
  });
});
