import { GoogleGenAI } from '@google/genai';
import type { UserProfile } from '../components/ProfileForm';

export interface BusinessRecommendation {
  title: string;
  description: string;
  whyItFits: string;
  firstSteps: string[];
  estimatedStartupCost: string;
  potentialIncomeRange: string;
}

export interface BusinessAdviceResponse {
  personalNote: string;
  recommendations: BusinessRecommendation[];
}

const BRIGHT_DATA_API_KEY = import.meta.env.VITE_BRIGHT_DATA_API_KEY as string | undefined;
const BRIGHT_DATA_ZONE = import.meta.env.VITE_BRIGHT_DATA_ZONE as string | undefined;

const WEB_CONTEXT_SOURCES = [
  'https://www.montgomeryal.gov/city-government/news',
  'https://www.montgomerychamber.com/news/',
  'https://www.visitingmontgomery.com/events',
  'https://www.montgomeryadvertiser.com/business',
  'https://asbtdc.org',
  'https://thelabondexter.com',
  'https://alabamalaunchpad.com',
  'https://score.org',
  'https://www.sba.gov/offices/district/al/birmingham',
];

const ARCGIS_ENDPOINTS = [
  {
    label: 'Business Licenses Count',
    url: 'https://services6.arcgis.com/yFiKe7ISrP1XT7v3/arcgis/rest/services/Business_Licenses/FeatureServer/0/query?where=1%3D1&returnCountOnly=true&f=json',
  },
  {
    label: 'Building Permits Count',
    url: 'https://services6.arcgis.com/yFiKe7ISrP1XT7v3/arcgis/rest/services/Building_Permits/FeatureServer/0/query?where=1%3D1&returnCountOnly=true&f=json',
  },
];

const stripHtml = (rawHtml: string): string => {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return rawHtml.replace(/<[^>]+>/g, ' ');
  }
  const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
  return doc.body.textContent ?? '';
};

const normalizeText = (text: string, maxLen = 1800): string => {
  return text.replace(/\s+/g, ' ').trim().slice(0, maxLen);
};

const extractBodyFromBrightDataPayload = (payload: string): string => {
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    const candidate = parsed.body ?? parsed.content ?? parsed.html ?? parsed.data;
    if (typeof candidate === 'string') return candidate;
  } catch {
    // Not JSON; treat response as raw HTML/text.
  }
  return payload;
};

const fetchTextViaBrightData = async (url: string): Promise<string> => {
  if (!BRIGHT_DATA_API_KEY || !BRIGHT_DATA_ZONE) {
    throw new Error('Missing VITE_BRIGHT_DATA_API_KEY or VITE_BRIGHT_DATA_ZONE in .env.local');
  }

  const response = await fetch('https://api.brightdata.com/request', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      zone: BRIGHT_DATA_ZONE,
      url,
      format: 'raw',
    }),
  });

  if (!response.ok) {
    throw new Error(`Bright Data request failed (${response.status})`);
  }

  const raw = await response.text();
  const payload = extractBodyFromBrightDataPayload(raw);
  return normalizeText(stripHtml(payload));
};

const fetchArcGisContextLine = async (label: string, url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`ArcGIS request failed (${response.status})`);
  }
  const data = (await response.json()) as { count?: number };
  if (typeof data.count === 'number') {
    return `${label}: ${data.count}`;
  }
  return `${label}: ${JSON.stringify(data).slice(0, 400)}`;
};

const buildExternalContext = async (): Promise<string> => {
  const webResults = await Promise.allSettled(
    WEB_CONTEXT_SOURCES.map(async (url) => {
      const text = await fetchTextViaBrightData(url);
      if (!text) throw new Error('Empty page text');
      return `[WEB] ${url}\n${text}`;
    })
  );

  const arcgisResults = await Promise.allSettled(
    ARCGIS_ENDPOINTS.map((source) => fetchArcGisContextLine(source.label, source.url))
  );

  const sections: string[] = [];

  for (const result of webResults) {
    if (result.status === 'fulfilled') {
      sections.push(result.value);
    }
  }

  const arcgisContext = arcgisResults
    .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
    .map((result) => result.value);

  if (arcgisContext.length > 0) {
    sections.push(`[ARCGIS]\n${arcgisContext.join('\n')}`);
  }

  if (sections.length === 0) {
    return 'No external context sources were reachable at request time.';
  }

  return sections.join('\n\n').slice(0, 14000);
};

const safeParseAdvice = (rawText: string): BusinessAdviceResponse => {
  const parsed = JSON.parse(rawText) as Partial<BusinessAdviceResponse>;
  if (!parsed.personalNote || !Array.isArray(parsed.recommendations)) {
    throw new Error('Gemini response format is invalid.');
  }
  return {
    personalNote: parsed.personalNote,
    recommendations: parsed.recommendations.slice(0, 6).map((item) => ({
      title: item.title ?? 'Untitled recommendation',
      description: item.description ?? 'No description provided.',
      whyItFits: item.whyItFits ?? 'No match reason provided.',
      firstSteps: Array.isArray(item.firstSteps) ? item.firstSteps.slice(0, 4) : [],
      estimatedStartupCost: item.estimatedStartupCost ?? 'Varies',
      potentialIncomeRange: item.potentialIncomeRange ?? 'Depends on demand',
    })),
  };
};

export const getBusinessAdvice = async (profile: UserProfile): Promise<BusinessAdviceResponse> => {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!geminiApiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY in .env.local');
  }

  const client = new GoogleGenAI({ apiKey: geminiApiKey });

  const externalContext = await buildExternalContext();

  const prompt = `You are a practical local business advisor for Montgomery, Alabama.

Analyze this user profile and recommend realistic micro-business opportunities.
Return ONLY valid JSON with this exact shape:
{
  "personalNote": "string",
  "recommendations": [
    {
      "title": "string",
      "description": "string",
      "whyItFits": "string",
      "firstSteps": ["string", "string", "string"],
      "estimatedStartupCost": "string",
      "potentialIncomeRange": "string"
    }
  ]
}

Rules:
- Give 4-6 recommendations.
- Keep recommendations feasible with the user's capital, hours, transport, and workspace.
- Prefer opportunities relevant to Montgomery neighborhoods and local demand.
- Keep language clear and actionable.

EXTERNAL CONTEXT (web scraping + ArcGIS):
${externalContext}

USER PROFILE:
${JSON.stringify(profile, null, 2)}
`;

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: 'application/json',
      temperature: 0.6,
    },
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error('Gemini returned an empty response.');
  }

  return safeParseAdvice(responseText);
};
