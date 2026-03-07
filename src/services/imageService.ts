import { GoogleGenAI } from "@google/genai";

export async function generateHeroImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A high-quality, photorealistic vertical image of a dog scratching a wooden door inside a house, depicting separation anxiety. The dog is the main subject, positioned slightly to the right of the frame, leaving clear, clean space on the left for text. The lighting is natural and warm. The dog (a medium-sized breed like a Golden Retriever or Labrador) is standing on its hind legs, paws against the door, looking distressed. Realistic textures on the fur and the door. Clean, professional composition for a landing page hero section.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:5",
      },
    },
  });

  for (const part of response.candidates![0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

export async function editHeroImage(base64Image: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  // Remove the data:image/png;base64, prefix if present
  const base64Data = base64Image.split(',')[1] || base64Image;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg",
          },
        },
        {
          text: 'Extend this image vertically to a 4:5 aspect ratio (1080x1350). Keep the original dog, door, and central scene exactly as they are. Use outpainting to extend the frame upwards to show more of the upper door and wall, and downwards to show more of the floor. Maintain the exact same photographic style, lighting, and photorealistic textures. The original part of the image must remain intact and unchanged.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "4:5",
      },
    },
  });

  for (const part of response.candidates![0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
