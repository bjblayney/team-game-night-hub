
export enum GameType {
  TRIVIA = 'TRIVIA',
  WOULD_YOU_RATHER = 'WOULD_YOU_RATHER',
  ICEBREAKER = 'ICEBREAKER',
  THIS_OR_THAT = 'THIS_OR_THAT',
  POLL = 'POLL'
}

export interface GamePrompt {
  id: string;
  question: string;
  answer?: string; // Optional for trivia
  options?: string[]; // Optional for This-or-That or Polls
}

export interface BuiltInGame {
  id: string;
  title: string;
  description: string;
  type: GameType;
  color: string;
  icon: string;
  prompts: GamePrompt[];
}

export interface ExternalGame {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  emoji: string;
}

export interface AppData {
  builtInGames: BuiltInGame[];
  externalGames: ExternalGame[];
}
