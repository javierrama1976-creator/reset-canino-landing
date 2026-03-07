import { GoogleGenAI } from "@google/genai";

async function generateTransformationImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A split scene image showing dog separation anxiety transformation. Left side: a stressed dog scratching the door and barking when the owner leaves, dark stressed mood. Right side: the same dog calm and relaxed sleeping peacefully in the house, bright warm lighting. Ultra realistic photography, cinematic style.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        console.log("IMAGE_DATA:" + base64EncodeString);
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generateTransformationImage();
