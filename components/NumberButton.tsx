import React from 'react';

interface NumberButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const NumberButton: React.FC<NumberButtonProps> = ({ value, onClick, className = '', disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={value === 'C' ? 'Cancella' : value === '✓' ? 'Invia' : `Numero ${value}`}
    className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 text-lg xs:text-xl sm:text-2xl font-bold rounded-md shadow-sm transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50
                disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {value}
  </button>
);

export default NumberButton;