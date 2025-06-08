import React from 'react';
import NumberButton from './NumberButton';

interface NumberPadProps {
  onNumberClick: (digit: string) => void;
  onClearClick: () => void;
  onSubmitClick: () => void;
  disabledSubmit: boolean;
  disabledInput: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onClearClick, onSubmitClick, disabledSubmit, disabledInput }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-2 p-1 xs:p-2 bg-white bg-opacity-40 rounded-md shadow-md max-w-xs mx-auto">
      {numbers.map((num) => (
        <NumberButton 
          key={num} 
          value={num} 
          onClick={() => onNumberClick(num)} 
          disabled={disabledInput}
          className="bg-white text-brand-dark hover:bg-gray-50"
        />
      ))}
      <NumberButton 
        value="C" 
        onClick={onClearClick} 
        className="bg-red-600 hover:bg-red-700 text-white" 
        disabled={disabledInput}
      />
      <NumberButton 
        value="✓" 
        onClick={onSubmitClick} 
        className="bg-green-600 hover:bg-green-700 text-white" 
        disabled={disabledSubmit || disabledInput}
      />
    </div>
  );
};

export default NumberPad;