import React from 'react';

const LoadingState = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    <p className="mt-3 text-sm text-gray-500">{message}</p>
  </div>
);

export default LoadingState;
