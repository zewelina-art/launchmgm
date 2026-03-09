import { GoogleGenAI, Type } from "@google/genai";
import { MONTGOMERY_CITY_DATA, ECONOMIC_CONTEXT, SUPPORT_PROGRAMS } from "../data/montgomeryContext";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export interface UserProfile {
  neighborhood: string;
  employmentStatus: string;
  skills: string;
  passions: string;
  capital: number;
  hasVehicle: boolean;
  weeklyHours: number;
  hasSupportNetwork: boolean;
  hasWorkspace: boolean;
  preferredArea: string;
  barriers: string;
}

export const getBusinessAdvice = async (profile: UserProfile) => {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `
You are LaunchMGM — an AI business opportunity advisor for residents of Montgomery, Alabama.
Your role is to analyze a user's profile together with current economic and city data, and identify realistic micro-business opportunities they can start with their available resources.
The goal is to help residents discover practical ways to start a small business, access local support programs, and generate income.
You are not a general chatbot. You only provide guidance related to starting or growing small businesses in Montgomery, Alabama.

TONE AND STYLE:
Speak directly and respectfully to the user as an equal. Be practical, concrete, and solution-focused.
Never be patronizing and never describe the user or their neighborhood using terms such as low income, poverty, underprivileged, disadvantaged, or at-risk.
If the user mentions barriers such as criminal record, lack of childcare, fear of failure, lack of business knowledge, address them directly with clear guidance.

INPUT DATA CONTEXT:
${MONTGOMERY_CITY_DATA}
${ECONOMIC_CONTEXT}
${SUPPORT_PROGRAMS}

BUSINESS MATCHING RULES:
1. Match at least one of the user's skills.
2. Required startup capital does NOT exceed the user's available capital.
3. User has the time and logistics (vehicle, workspace) needed.
4. Connected to real demand in Montgomery (gaps in city data, new investments, neighborhood needs).
Generate 4–6 opportunities ordered best to worst match.

GRANT MATCHING RULES:
Only include grants matching the user's situation and capital. Exclude expired programs.

OUTPUT FORMAT:
Strictly respond in valid JSON.
`;

  const prompt = `
USER PROFILE:
- Neighborhood: ${profile.neighborhood}
- Employment: ${profile.employmentStatus}
- Skills: ${profile.skills}
- Passions/Additional Skills: ${profile.passions}
- Startup Capital: $${profile.capital}
- Vehicle Access: ${profile.hasVehicle ? "Yes" : "No"}
- Weekly Hours: ${profile.weeklyHours}
- Support Network: ${profile.hasSupportNetwork ? "Yes" : "No"}
- Workspace: ${profile.hasWorkspace ? "Yes" : "No"}
- Preferred Area: ${profile.preferredArea}
- Barriers: ${profile.barriers}

Analyze this profile and provide recommendations.
`;

  const response = await genAI.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalNote: { type: Type.STRING, description: "A respectful opening note addressing the user directly." },
          niches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                whyItWorks: { type: Type.STRING },
                estimatedStartupCost: { type: Type.STRING },
                potentialIncome: { type: Type.STRING }
              },
              required: ["title", "description", "whyItWorks", "estimatedStartupCost", "potentialIncome"]
            }
          },
          grants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.STRING },
                description: { type: Type.STRING },
                link: { type: Type.STRING }
              },
              required: ["name", "amount", "description"]
            }
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.INTEGER },
                action: { type: Type.STRING },
                timeframe: { type: Type.STRING }
              },
              required: ["step", "action", "timeframe"]
            }
          },
          barrierResponse: { type: Type.STRING, description: "Direct guidance addressing the user's specific barriers." },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "description"]
            }
          },
          dataNote: { type: Type.STRING, description: "A brief note on the local data used for these recommendations." }
        },
        required: ["personalNote", "niches", "grants", "roadmap", "barrierResponse", "resources", "dataNote"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
