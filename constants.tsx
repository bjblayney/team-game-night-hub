
import { GameType, AppData } from './types';

export const INITIAL_DATA: AppData = {
  builtInGames: [
    {
      id: 'trivia-1',
      title: 'Global Trivia',
      description: 'Test your team\'s knowledge on everything from history to pop culture.',
      type: GameType.TRIVIA,
      color: 'bg-indigo-500',
      icon: '🧠',
      prompts: [
        { id: '1', question: 'What is the most consumed manufactured drink in the world?', answer: 'Tea' },
        { id: '2', question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
        { id: '3', question: 'What is the capital city of Australia?', answer: 'Canberra' },
        { id: '4', question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
        { id: '5', question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean' },
        { id: '6', question: 'Which element has the chemical symbol "O"?', answer: 'Oxygen' },
        { id: '7', question: 'In what year did the Titanic sink?', answer: '1912' },
        { id: '8', question: 'What is the hardest natural substance on Earth?', answer: 'Diamond' },
        { id: '9', question: 'Which country is home to the kangaroo?', answer: 'Australia' },
        { id: '10', question: 'What is the smallest prime number?', answer: '2' },
        { id: '11', question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
        { id: '12', question: 'What is the main ingredient in guacamole?', answer: 'Avocado' },
        { id: '13', question: 'Which is the longest river in the world?', answer: 'Nile' },
        { id: '14', question: 'What is the square root of 144?', answer: '12' },
        { id: '15', question: 'Which metal is liquid at room temperature?', answer: 'Mercury' }
      ]
    },
    {
      id: 'wyr-1',
      title: 'Would You Rather',
      description: 'The classic game of impossible choices. Perfect for sparking debates.',
      type: GameType.WOULD_YOU_RATHER,
      color: 'bg-rose-500',
      icon: '🤔',
      prompts: [
        { id: '1', question: 'Would you rather always have to sing instead of speaking or dance instead of walking?' },
        { id: '2', question: 'Would you rather explore space or the deepest parts of the ocean?' },
        { id: '3', question: 'Would you rather have a rewind button or a pause button on your life?' },
        { id: '4', question: 'Would you rather be able to talk to animals or speak every human language?' },
        { id: '5', question: 'Would you rather always be 10 minutes late or 20 minutes early?' },
        { id: '6', question: 'Would you rather have a personal chef or a personal driver?' },
        { id: '7', question: 'Would you rather lose the ability to read or lose the ability to speak?' },
        { id: '8', question: 'Would you rather live in a world with no music or no movies?' },
        { id: '9', question: 'Would you rather be famous but misunderstood or unknown but deeply loved?' },
        { id: '10', question: 'Would you rather always have a pebble in your shoe or a single hair in your eye?' },
        { id: '11', question: 'Would you rather be an Olympic athlete or a Nobel Prize winner?' },
        { id: '12', question: 'Would you rather have unlimited free flight tickets or unlimited free hotel stays?' },
        { id: '13', question: 'Would you rather know the date of your death or the cause of your death?' },
        { id: '14', question: 'Would you rather be able to teleport or be able to fly?' },
        { id: '15', question: 'Would you rather always feel like you have to sneeze or always feel like you have a popcorn kernel stuck in your teeth?' }
      ]
    },
    {
      id: 'ice-1',
      title: 'Icebreakers',
      description: 'Lighthearted questions to get to know your teammates better.',
      type: GameType.ICEBREAKER,
      color: 'bg-emerald-500',
      icon: '🧊',
      prompts: [
        { id: '1', question: 'What was your first job?' },
        { id: '2', question: 'If you could live anywhere in the world for a year, where would it be?' },
        { id: '3', question: 'What’s the best piece of advice you’ve ever received?' },
        { id: '4', question: 'What is your most used emoji?' },
        { id: '5', question: 'If you could have dinner with any historical figure, who would it be?' },
        { id: '6', question: 'What is a skill you’d love to learn?' },
        { id: '7', question: 'What’s the most adventurous thing you’ve ever done?' },
        { id: '8', question: 'If you were an animal, what would you be?' },
        { id: '9', question: 'What is your favorite book or movie of all time?' },
        { id: '10', question: 'What’s one thing you can’t live without?' },
        { id: '11', question: 'What is your "go-to" karaoke song?' },
        { id: '12', question: 'What’s the first thing you do when you wake up?' },
        { id: '13', question: 'If you could only eat one meal for the rest of your life, what would it be?' },
        { id: '14', question: 'What’s your favorite childhood memory?' },
        { id: '15', question: 'If you won the lottery tomorrow, what is the first thing you would buy?' }
      ]
    },
    {
      id: 'tot-1',
      title: 'This or That',
      description: 'Quick-fire preferences. Rapid choices, rapid discussion.',
      type: GameType.THIS_OR_THAT,
      color: 'bg-amber-500',
      icon: '⚖️',
      prompts: [
        { id: '1', question: 'Coffee or Tea?' },
        { id: '2', question: 'Early Bird or Night Owl?' },
        { id: '3', question: 'Cats or Dogs?' },
        { id: '4', question: 'Physical Books or E-books?' },
        { id: '5', question: 'Beach Vacation or Mountain Cabin?' },
        { id: '6', question: 'iPhone or Android?' },
        { id: '7', question: 'Summer or Winter?' },
        { id: '8', question: 'Comedy or Horror?' },
        { id: '9', question: 'Pizza or Tacos?' },
        { id: '10', question: 'Introvert or Extrovert?' },
        { id: '11', question: 'Sweet or Savory?' },
        { id: '12', question: 'Pancakes or Waffles?' },
        { id: '13', question: 'City Life or Country Life?' },
        { id: '14', question: 'Podcast or Music?' },
        { id: '15', question: 'Work from Office or Remote Work?' }
      ]
    }
  ],
  externalGames: [
    {
      id: 'ext-1',
      name: 'Skribbl.io',
      description: 'Free multiplayer drawing and guessing game.',
      url: 'https://skribbl.io/',
      tags: ['drawing', 'fast', 'free'],
      emoji: '🎨'
    },
    {
      id: 'ext-2',
      name: 'Gartic Phone',
      description: 'The Telephone Game with drawings. High chaos potential.',
      url: 'https://garticphone.com/',
      tags: ['drawing', 'social', 'chaotic'],
      emoji: '📞'
    },
    {
      id: 'ext-3',
      name: 'GeoGuessr',
      description: 'Drop somewhere on Earth and guess where you are.',
      url: 'https://www.geoguessr.com/',
      tags: ['geography', 'exploration', 'puzzle'],
      emoji: '🌍'
    },
    {
      id: 'ext-4',
      name: 'Codenames',
      description: 'Online version of the popular social deduction board game.',
      url: 'https://codenames.game/',
      tags: ['strategy', 'word-game', 'teamwork'],
      emoji: '🕵️'
    }
  ]
};
