import { GoogleGenAI, Type } from "@google/genai";
import type { Tour } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Gets a tour recommendation from the Gemini API based on a user prompt.
 * @param userPrompt The user's description of their ideal trip.
 * @param tours The list of available tours.
 * @returns The ID of the recommended tour.
 */
export const getTourRecommendation = async (
  userPrompt: string,
  tours: Tour[],
  language: 'es' | 'en'
): Promise<string | null> => {
  try {
    // We only need specific fields for the AI to make a decision.
    // Sending everything could be too noisy.
    const simplifiedTours = tours.map(tour => ({
      id: tour.id,
      title: tour.title,
      legend: tour.legend,
      category: tour.category,
      includes: tour.details.includes,
    }));

    const systemInstruction = `You are an expert tour guide for Joseph Tours in San Blas, Panama.
Your task is to analyze the user's request and recommend the single best tour package from the provided list of available tours.
The user is communicating in ${language === 'es' ? 'Spanish' : 'English'}.
Analyze their preferences (e.g., relaxation, adventure, family, budget, duration, interests).
Based on your analysis, choose the tour that is the most suitable match.
You MUST return your answer in JSON format, containing only the 'id' of the chosen tour. Do not add any other text, explanation, or markdown formatting.

Here is the list of available tours:
${JSON.stringify(simplifiedTours, null, 2)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tourId: {
              type: Type.STRING,
              description: 'The unique ID of the recommended tour.'
            },
          },
          required: ['tourId']
        },
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && result.tourId) {
      // Verify the ID exists in our list to prevent hallucinated IDs.
      const tourExists = tours.some(tour => tour.id === result.tourId);
      return tourExists ? result.tourId : null;
    }

    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
