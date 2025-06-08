
export enum GameState {
  Playing = 'PLAYING',
  Correct = 'CORRECT',
  Incorrect = 'INCORRECT',
  ShowingFact = 'SHOWING_FACT',
}

export interface FunFact {
  text: string;
  sourceNumber: number;
}

export enum CharacterMood {
  Thinking = 'THINKING',
  Happy = 'HAPPY',
  Sad = 'SAD',
  Wow = 'WOW',
}

export enum DifficultyLevel {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}
