// components/Spinner.tsx

import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
    </div>
  );
};

export default Spinner;
