import { useState } from 'react';
import { AnalyzeResult, ChangeToneResult } from '../types';
import { useAnalyzeTone, useChangeTone } from '../hooks';

const useTextMoodProcessor = () => {
  const [text, setText] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [analyzeResult, setAnalyzeResult] = useState<AnalyzeResult | null>(null);
  const [changeToneResult, setChangeToneResult] = useState<ChangeToneResult | null>(null);
  const [showToneSelector, setShowToneSelector] = useState(false);

  const { analyzeTone } = useAnalyzeTone();
  const { changeTone } = useChangeTone();

  const handleAnalyzeTone = async () => {
    if (text.length >= 50) {
      const result = await analyzeTone(text);
      if (result) {
        setAnalyzeResult(result);
        setChangeToneResult(null);
      }
    }
  };

  const handleChangeTone = () => {
    if (text.length >= 50) {
      setShowToneSelector(true);
    }
  };

  const handleAcceptToneChange = async () => {
    if (selectedTone) {
      const result = await changeTone(text, selectedTone);
      if (result) {
        setChangeToneResult(result);
        setAnalyzeResult(null);
        setShowToneSelector(false);
      }
    }
  };

  return {
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
    setShowToneSelector
  };
};

export default useTextMoodProcessor;
