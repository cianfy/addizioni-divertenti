
import React, { useState, useEffect, useCallback } from 'react';
import ProblemDisplay from './components/ProblemDisplay';
import NumberPad from './components/NumberPad';
import FeedbackDisplay from './components/FeedbackDisplay';
import CharacterDisplay from './components/CharacterDisplay';
import { GameState, FunFact, CharacterMood, DifficultyLevel } from './types';
import { ITEM_EMOJIS } from './constants';
import { getFunFactAboutNumber } from './services/geminiService';

const App: React.FC = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.Playing);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [characterMood, setCharacterMood] = useState<CharacterMood>(CharacterMood.Thinking);
  const [emoji1, setEmoji1] = useState<string>(ITEM_EMOJIS[0]);
  const [emoji2, setEmoji2] = useState<string>(ITEM_EMOJIS[1]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.Easy);

  const getRandomEmoji = (): string => ITEM_EMOJIS[Math.floor(Math.random() * ITEM_EMOJIS.length)];

  const generateNewProblem = useCallback(() => {
    let newNum1: number, newNum2: number;

    switch (difficulty) {
      case DifficultyLevel.Medium:
        if (Math.random() < 0.5) { // One single digit, one 10-19
          newNum1 = Math.floor(Math.random() * 10); // 0-9
          newNum2 = Math.floor(Math.random() * 10) + 10; // 10-19
        } else {
          newNum1 = Math.floor(Math.random() * 10) + 10; // 10-19
          newNum2 = Math.floor(Math.random() * 10); // 0-9
        }
        break;
      case DifficultyLevel.Hard:
        newNum1 = Math.floor(Math.random() * 10) + 10; // 10-19
        newNum2 = Math.floor(Math.random() * 10) + 10; // 10-19
        break;
      case DifficultyLevel.Easy:
      default:
        newNum1 = Math.floor(Math.random() * 10); // 0-9
        newNum2 = Math.floor(Math.random() * 10); // 0-9
        break;
    }
    
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 + newNum2);
    setUserAnswer('');
    setFeedbackMessage(null);
    setGameState(GameState.Playing);
    setFunFact(null);
    setCharacterMood(CharacterMood.Thinking);
    
    let newEmoji1 = getRandomEmoji();
    let newEmoji2 = getRandomEmoji();
    while (newEmoji2 === newEmoji1) {
        newEmoji2 = getRandomEmoji();
    }
    setEmoji1(newEmoji1);
    setEmoji2(newEmoji2);
  }, [difficulty]); // emoji1 was in dependency array, but it caused re-generation too often. Difficulty is the key driver.

  useEffect(() => {
    generateNewProblem();
  }, [generateNewProblem]); // generateNewProblem will change if difficulty changes

  const isInputDisabled = gameState === GameState.Correct || gameState === GameState.ShowingFact || isLoadingFact;

  const handleNumberInput = (digit: string) => {
    if (isInputDisabled) return;
    if (userAnswer.length < 2) { 
      setUserAnswer(prev => prev + digit);
    }
  };

  const handleClearInput = () => {
    if (isInputDisabled) return;
    setUserAnswer('');
  };

  const handleSubmitAnswer = () => {
    if (userAnswer === '') return;

    const userAnswerNum = parseInt(userAnswer, 10);
    if (userAnswerNum === correctAnswer) {
      setScore(prev => prev + 1);
      setGameState(GameState.Correct);
      setFeedbackMessage('Corretto! Fantastico! 🎉');
      setCharacterMood(CharacterMood.Happy);
    } else {
      setGameState(GameState.Incorrect);
      setFeedbackMessage(`Riprova! ${correctAnswer > userAnswerNum ? 'Più grande!' : 'Più piccolo!'}`);
      setCharacterMood(CharacterMood.Sad);
      setUserAnswer(''); 
    }
  };

  const handleNextProblem = () => {
    generateNewProblem();
  };

  const handleShowFunFact = async () => {
    if (!correctAnswer && correctAnswer !== 0) return;
    setIsLoadingFact(true);
    setGameState(GameState.ShowingFact);
    setCharacterMood(CharacterMood.Wow);
    setFeedbackMessage("Sto cercando una curiosità...");
    const factText = await getFunFactAboutNumber(correctAnswer);
    setFunFact({ text: factText || "Non ho trovato curiosità.", sourceNumber: correctAnswer });
    setIsLoadingFact(false);
    setFeedbackMessage(null); 
  };
  
  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    // generateNewProblem will be called by useEffect due to dependency change
  };

  const DifficultyButton: React.FC<{level: DifficultyLevel, current: DifficultyLevel, onClick: (level: DifficultyLevel) => void, children: React.ReactNode}> = 
    ({level, current, onClick, children}) => (
    <button
      onClick={() => onClick(level)}
      className={`py-1 px-2 xs:py-1.5 xs:px-3 rounded-md text-xs xs:text-sm font-semibold transition-all
                  ${current === level 
                    ? 'bg-brand-primary text-white shadow-lg scale-105' 
                    : 'bg-white text-brand-dark hover:bg-gray-100 shadow-sm'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-white/80 shadow-2xl rounded-xl p-2 text-center flex flex-col h-full max-h-[98vh] w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden">
      <header className="flex-shrink-0 pt-1 pb-1 sm:pt-2 sm:pb-2">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-brand-dark drop-shadow-md">Addizioni Divertenti!</h1>
        <div className="mt-1 text-lg xs:text-xl sm:text-2xl font-semibold text-white bg-brand-secondary py-1 px-2 sm:px-3 rounded-full inline-block shadow-sm">
          Punteggio: {score}
        </div>
        <div className="mt-1 xs:mt-2 flex justify-center space-x-1 xs:space-x-2">
          <DifficultyButton level={DifficultyLevel.Easy} current={difficulty} onClick={handleDifficultyChange}>Facile</DifficultyButton>
          <DifficultyButton level={DifficultyLevel.Medium} current={difficulty} onClick={handleDifficultyChange}>Medio</DifficultyButton>
          <DifficultyButton level={DifficultyLevel.Hard} current={difficulty} onClick={handleDifficultyChange}>Difficile</DifficultyButton>
        </div>
      </header>
      
      <div className="flex-shrink-0 my-0 sm:my-1">
        <CharacterDisplay mood={characterMood} />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center w-full overflow-y-auto p-1 sm:p-1 space-y-1 sm:space-y-2">
        {gameState !== GameState.ShowingFact && !funFact && (
          <ProblemDisplay num1={num1} num2={num2} userAnswer={userAnswer} emoji1={emoji1} emoji2={emoji2}/>
        )}

        <FeedbackDisplay message={feedbackMessage} gameState={gameState} />

        {funFact && gameState === GameState.ShowingFact && (
          <div className="my-1 p-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg shadow-md w-full">
            <h3 className="text-md xs:text-lg sm:text-xl font-semibold text-yellow-700 mb-1">Curiosità sul {funFact.sourceNumber}!</h3>
            {isLoadingFact ? (
              <p className="text-sm xs:text-base text-yellow-600 animate-pulse">Caricamento...</p>
            ) : (
              <p className="text-sm xs:text-base sm:text-lg text-yellow-800 max-h-24 overflow-y-auto">{funFact.text}</p>
            )}
             <button
              onClick={handleNextProblem}
              className="mt-2 bg-brand-primary hover:bg-blue-600 text-white font-bold py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg shadow-md text-sm xs:text-base"
            >
              Prossima
            </button>
          </div>
        )}

        {gameState !== GameState.ShowingFact && (
          <div className="mt-1 sm:mt-2 w-full flex justify-center">
            <NumberPad
              onNumberClick={handleNumberInput}
              onClearClick={handleClearInput}
              onSubmitClick={handleSubmitAnswer}
              disabledSubmit={userAnswer === '' || (gameState !== GameState.Playing && gameState !== GameState.Incorrect)}
              disabledInput={isInputDisabled}
            />
          </div>
        )}

        {gameState === GameState.Correct && (
          <div className="mt-1 sm:mt-2 space-y-1 xs:space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">
            <button
              onClick={handleNextProblem}
              className="bg-brand-primary hover:bg-blue-600 text-white font-bold py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg shadow-md text-sm xs:text-base"
            >
              Prossima
            </button>
            {process.env.API_KEY && (
                 <button
                 onClick={handleShowFunFact}
                 disabled={isLoadingFact}
                 className="bg-brand-secondary hover:bg-yellow-500 text-brand-dark font-bold py-1.5 px-3 xs:py-2 xs:px-4 rounded-lg shadow-md text-sm xs:text-base disabled:opacity-50"
               >
                 {isLoadingFact ? 'Carico...' : `Curiosità sul ${correctAnswer}!`}
               </button>
            )}
          </div>
        )}
      </main>
      <footer className="flex-shrink-0 mt-auto text-xs text-gray-500 py-1">
        <p>&copy; {new Date().getFullYear()} Avventura Matematica - cianfy.</p>
      </footer>
    </div>
  );
};

export default App;