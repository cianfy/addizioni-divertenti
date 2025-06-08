
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getFunFactAboutNumber = async (number: number): Promise<string | null> => {
  if (!ai) {
    return "Curiosità non disponibile (API Key mancante).";
  }

  const prompt = `Tell me a very short, one-sentence fun fact suitable for a 6-year-old child about the number ${number}. The fact should be easy to understand, positive, and in Italian. For example, for 3: 'Un triangolo ha 3 lati!' or for 7: 'Ci sono 7 colori nell'arcobaleno!'. Make it cheerful!`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.8, // Slightly more creative for fun facts
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching fun fact from Gemini:", error);
    return "Oops! Non sono riuscito a trovare una curiosità questa volta.";
  }
};
