
import React from 'react';
import { GameState } from '../types';

interface FeedbackDisplayProps {
  message: string | null;
  gameState: GameState;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ message, gameState }) => {
  if (!message) return <div className="min-h-[30px] xs:min-h-[48px] sm:min-h-[56px]"></div>; // Keep space to avoid layout shifts

  let textColor = 'text-gray-700';
  if (gameState === GameState.Correct) {
    textColor = 'text-green-600';
  } else if (gameState === GameState.Incorrect) {
    textColor = 'text-red-600';
  } else if (gameState === GameState.ShowingFact) {
    textColor = 'text-blue-600';
  }


  return (
    <div className={`text-center my-0.5 xs:my-1 p-1 xs:p-1.5 sm:p-2 rounded-md text-sm xs:text-base sm:text-lg font-semibold ${textColor} bg-white bg-opacity-70 shadow-sm min-h-[30px] xs:min-h-[48px] sm:min-h-[56px] flex items-center justify-center w-full max-w-md`}>
      {message}
    </div>
  );
};

export default FeedbackDisplay;
