import React from 'react';

interface NumberPadProps {
  onNumberClick: (digit: string) => void;
  onClearClick: () => void;
  onSubmitClick: () => void;
  disabledSubmit: boolean;
  disabledInput: boolean;
}

const NumberButton: React.FC<{ value: string; onClick: () => void; className?: string, disabled?: boolean }> = ({ value, onClick, className = '', disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={value === 'C' ? 'Cancella' : value === '✓' ? 'Invia' : `Numero ${value}`}
    className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-xl xs:text-2xl sm:text-3xl font-bold rounded-md shadow-sm transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50
                bg-white text-brand-dark hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {value}
  </button>
);


const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onClearClick, onSubmitClick, disabledSubmit, disabledInput }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-2 p-1 xs:p-2 bg-white bg-opacity-40 rounded-md shadow-md max-w-xs mx-auto">
      {numbers.map((num) => (
        <NumberButton key={num} value={num} onClick={() => onNumberClick(num)} disabled={disabledInput}/>
      ))}
      <NumberButton value="C" onClick={onClearClick} className="bg-red-600 hover:bg-red-700 text-white" disabled={disabledInput}/>
      <NumberButton value="✓" onClick={onSubmitClick} className="bg-green-600 hover:bg-green-700 text-white" disabled={disabledSubmit || disabledInput}/>
    </div>
  );
};

export default NumberPad;