// components/AnalyzeButton.tsx

import React from 'react';

interface AnalyzeButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`bg-red-600 text-white font-bold py-2 px-4 rounded-lg ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
      }`}
    >
      {isLoading ? 'Analyzing...' : 'Analyze'}
    </button>
  );
};

export default AnalyzeButton;
