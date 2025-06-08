
import React from 'react';
import VisualAid from './VisualAid';
// import { ITEM_EMOJIS } from '../constants'; // Not used directly

interface ProblemDisplayProps {
  num1: number;
  num2: number;
  userAnswer: string;
  emoji1: string;
  emoji2: string;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ num1, num2, userAnswer, emoji1, emoji2 }) => {
  return (
    <div className="text-center my-1 p-1 xs:p-2 bg-white bg-opacity-60 rounded-lg shadow-lg w-full">
      <div className="flex justify-around items-center mb-1 xs:mb-2">
        <VisualAid count={num1} itemEmoji={emoji1} colorClass="bg-blue-100" />
        <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-brand-dark mx-1 xs:mx-2 sm:mx-3">+</span>
        <VisualAid count={num2} itemEmoji={emoji2} colorClass="bg-pink-100" />
      </div>
      <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark tracking-wider p-1 xs:p-2 border-b-2 sm:border-b-4 border-brand-secondary">
        {num1} + {num2} = <span className="text-brand-primary min-w-[30px] xs:min-w-[40px] sm:min-w-[50px] inline-block">{userAnswer || '?'}</span>
      </div>
    </div>
  );
};

export default ProblemDisplay;
