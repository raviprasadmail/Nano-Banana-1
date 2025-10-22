
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditedImage, GenerativePart } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImage(
  imagePart: GenerativePart,
  prompt: string
): Promise<EditedImage> {
  try {
    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
                text = part.text;
            }
        }
    }

    if (!imageUrl && !text) {
      // Fallback text if the model response is empty or unexpected
      text = "The model did not return any content. Try a different prompt.";
    }

    return { imageUrl, text };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(
      "Failed to communicate with the AI model. Please check your connection or API key."
    );
  }
}
