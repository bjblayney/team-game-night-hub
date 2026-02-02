import { GoogleGenAI, Type } from "@google/genai";
import { GameType } from "../types";

const CONFIG_KEY = 'gemini-api-config';

interface ApiConfig {
  apiKey: string;
  model: string;
}

export const getApiConfig = (): ApiConfig | null => {
  const saved = localStorage.getItem(CONFIG_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};

export const isApiConfigured = (): boolean => {
  const config = getApiConfig();
  return config !== null && config.apiKey.length > 0;
};

export const generateFreshPrompts = async (type: GameType, count: number = 15) => {
  const config = getApiConfig();
  if (!config || !config.apiKey) {
    console.warn("No API key configured, returning empty prompts");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey: config.apiKey });
  const promptMap = {
    [GameType.TRIVIA]: "Generate unique, medium-difficulty trivia questions with answers. Include a mix of pop culture, science, and history. Avoid common trivia tropes.",
    [GameType.WOULD_YOU_RATHER]: "Generate creative 'Would You Rather' questions. Focus on work-appropriate but hilarious social dilemmas.",
    [GameType.ICEBREAKER]: "Generate insightful icebreaker questions that help remote teams find common ground. Avoid generic ones like 'what's your favorite color'.",
    [GameType.THIS_OR_THAT]: "Generate contrasting 'This or That' pairs. Some should be classic (Coffee vs Tea), others should be workplace-centric or funny.",
    [GameType.POLL]: "Generate engaging multiple choice poll questions suitable for a fun team-building wrap-up."
  };

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING },
        answer: { type: Type.STRING, description: "Only for trivia, otherwise omit or empty string" },
        options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Only for polls" }
      },
      required: ["question"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: config.model,
      contents: `Task: ${promptMap[type]}. Count: ${count}. Output exactly ${count} items. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const parsed = JSON.parse(response.text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return [];
  }
};
