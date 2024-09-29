import React from 'react';
import {
  AnalyzeButton,
  ChangeToneButton,
  TextAreaInput,
  ToneSelector,
  AnalyzeResultDisplay,
  ChangeToneResultDisplay,
} from './components';
import { useTextMoodProcessor } from './hooks';

/**
 * Main App component that manages text input, tone analysis, and tone change
 */
const App: React.FC = () => {
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
    setShowToneSelector
  } = useTextMoodProcessor();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-pink-300 flex flex-col justify-between">
      <div className="flex flex-grow justify-center items-center">
        <div className="container mx-auto p-8 md:p-10 lg:p-12 xl:p-16 max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-2xl rounded-3xl">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-700">
            Text Mood Processor
          </h1>

          <TextAreaInput text={text} setText={setText} />

          <div className="flex justify-center mt-4 space-x-2">
            <AnalyzeButton
              onAnalyze={handleAnalyzeTone}
              disabled={text.length < 50}
              className="p-3 bg-blue-700 text-white rounded-lg shadow-md border border-black hover:bg-blue-600 transition-all duration-200"
            />
            <ChangeToneButton
              onChangeTone={handleChangeTone}
              disabled={text.length < 50}
              className="p-3 bg-green-700 text-white rounded-lg shadow-md border border-black hover:bg-green-600 transition-all duration-200"
            />
          </div>

          {analyzeResult && <AnalyzeResultDisplay result={analyzeResult} />}
          {changeToneResult && <ChangeToneResultDisplay result={changeToneResult} />}

          {showToneSelector && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Choose the tone you want to swap</h2>
                <ToneSelector selectedTone={selectedTone} setSelectedTone={setSelectedTone} />
                <button
                  onClick={handleAcceptToneChange}
                  className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                >
                  Accept
                </button>
                <button
                  onClick={() => setShowToneSelector(false)}
                  className="mt-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 text-center">
        <p className="text-sm">&copy; 2024 Text Mood Processor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
