import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROFILE, PUBLICATIONS, TECHNICAL_PROJECTS, INDUSTRY_EXPERIENCE } from '../data';

// Construct a context string for the AI
const SYSTEM_CONTEXT = `
You are an AI assistant on the personal website of ${PROFILE.name}.
Your goal is to answer visitor questions about Yifeng's research in Robotics, Computer Vision, and Embodied Intelligence.
Keep answers concise, intellectual, and calm.
Adhere to a tone that is "Objective, Insightful, and Minimalist".

Context:
Bio: ${PROFILE.bio}
Affiliation: ${PROFILE.affiliation}

Publications:
${PUBLICATIONS.map(p => `- ${p.title} (${p.year}) at ${p.venue}. Abstract: ${p.abstract}`).join('\n')}

Research & Projects:
${TECHNICAL_PROJECTS.map(p => `- ${p.title} (${p.affiliation}): ${p.description}`).join('\n')}

Industry Experience:
${INDUSTRY_EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.date}): ${e.description}`).join('\n')}

If asked about things outside this context, politely steer the conversation back to Yifeng's research.
`;

let ai: GoogleGenAI | null = null;

export const initGenAI = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found");
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const client = initGenAI();
  if (!client) return "API Key is missing. Please check configuration.";

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_CONTEXT,
      },
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};
