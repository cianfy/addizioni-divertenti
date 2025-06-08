
import React from 'react';
import { CharacterMood } from '../types';

interface CharacterDisplayProps {
  mood: CharacterMood;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ mood }) => {
  let emoji = '🤔'; // Thinking
  let animationClass = 'animate-pulse-emoji';

  switch (mood) {
    case CharacterMood.Happy:
      emoji = '🥳';
      animationClass = 'animate-bounce-slow';
      break;
    case CharacterMood.Sad:
      emoji = '😟';
      animationClass = 'animate-wiggle';
      break;
    case CharacterMood.Wow:
      emoji = '🤩';
      animationClass = 'animate-ping-slow';
      break;
    case CharacterMood.Thinking:
    default:
      emoji = '🤔';
      animationClass = 'animate-pulse-emoji';
      break;
  }

  return (
    <div className={`text-5xl xs:text-6xl sm:text-7xl ${animationClass} my-0`}>
      {emoji}
    </div>
  );
};

export default CharacterDisplay;
