import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="p-4 rounded-full bg-red-100 text-red-600">
      <AlertCircle size={32} />
    </div>
    <p className="mt-4 text-sm text-gray-700 text-center max-w-sm">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
