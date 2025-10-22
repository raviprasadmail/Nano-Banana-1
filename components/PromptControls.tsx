
import React from 'react';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  onReset,
  isLoading,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-800/60 border border-gray-700 rounded-xl">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'Make the sky a vibrant sunset' or 'Add a majestic castle in the background'"
        className="w-full flex-grow bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
        rows={2}
        disabled={isLoading}
      />
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
            onClick={onReset}
            disabled={isLoading}
            className="px-5 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all disabled:bg-gray-700 disabled:cursor-not-allowed w-1/2 sm:w-auto"
        >
            Reset
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="w-1/2 sm:w-auto px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};
