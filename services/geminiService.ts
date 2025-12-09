import { GoogleGenAI, Type } from "@google/genai";
import { ReceiptData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseReceiptImage = async (base64Image: string, mimeType: string = 'image/jpeg', categories: string[] = []): Promise<ReceiptData> => {
  try {
    const categoryContext = categories.length > 0 
      ? `Classify the expense into one of these exact categories: ${JSON.stringify(categories)}. \n   - Analyze the extracted line items to determine the nature of the expense (e.g., if items are meat, choose '식자재-육류'). \n   - If none match perfectly, choose the closest one or use '기타'.`
      : "Classify into a relevant category (e.g., Ingredients, Maintenance).";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: `Analyze this receipt image. 
            1. Extract the merchant/restaurant name.
            2. Extract the transaction date (YYYY-MM-DD).
            3. Extract the total amount.
            4. Extract individual line items with their names, quantities (default to 1), and prices.
            5. ${categoryContext}`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalAmount: { type: Type.NUMBER },
            merchantName: { type: Type.STRING },
            date: { type: Type.STRING },
            category: { type: Type.STRING },
            items: { 
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  quantity: { type: Type.NUMBER }
                }
              }
            }
          },
          required: ["totalAmount", "merchantName"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data returned from Gemini");
    }

    const data = JSON.parse(text) as ReceiptData;
    return data;

  } catch (error) {
    console.error("Error parsing receipt with Gemini:", error);
    throw error;
  }
};