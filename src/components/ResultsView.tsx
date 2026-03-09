import React from 'react';
import { motion } from 'motion/react';
import type { BusinessAdviceResponse } from '../services/gemini';

interface ResultsViewProps {
  data: BusinessAdviceResponse;
  onReset: () => void;
}

interface SupportInstitution {
  name: string;
  description: string;
  url: string;
  matchKeywords: string[];
}

const SUPPORT_INSTITUTIONS: SupportInstitution[] = [
  {
    name: 'ASU Small Business Development Center (SBDC)',
    description: 'free coaching and business plan support, (334) 229-4138',
    url: 'https://asbtdc.aum.edu',
    matchKeywords: ['all', 'service', 'food', 'retail', 'cleaning', 'repair', 'care', 'delivery'],
  },
  {
    name: 'TruFund Alabama',
    description: 'micro-loans and small business lending',
    url: 'https://www.trufund.org/markets/alabama/small-business-lending',
    matchKeywords: ['micro', 'small', 'solo', 'service', 'home', 'beauty', 'food', 'startup'],
  },
  {
    name: 'Montgomery Chamber of Commerce',
    description: 'networking and mentoring',
    url: 'https://www.montgomerychamber.com',
    matchKeywords: ['b2b', 'professional', 'consulting', 'agency', 'logistics', 'trade', 'sales'],
  },
  {
    name: 'The Lab on Dexter',
    description: 'incubator for tech and creative businesses',
    url: 'https://thelabondexter.com',
    matchKeywords: ['tech', 'software', 'app', 'digital', 'creative', 'media', 'design', 'marketing'],
  },
  {
    name: 'Montgomery County Revolving Loan Fund',
    description: 'low-interest loans for businesses creating jobs',
    url: 'https://www.montgomeryal.gov/government/city-departments/planning-development',
    matchKeywords: ['facility', 'warehouse', 'manufacturing', 'expansion', 'hiring', 'jobs', 'construction'],
  },
  {
    name: 'Alabama Launchpad',
    description: 'grants and competitions for startups',
    url: 'https://alabamalaunchpad.com',
    matchKeywords: ['startup', 'innovation', 'tech', 'product', 'scale', 'saas'],
  },
  {
    name: 'SCORE Montgomery',
    description: 'free mentoring from experienced entrepreneurs',
    url: 'https://www.score.org',
    matchKeywords: ['all', 'plan', 'operations', 'finance', 'mentoring', 'new business'],
  },
];

const getSupportInstitutionsForRecommendation = (title: string, description: string): SupportInstitution[] => {
  const haystack = `${title} ${description}`.toLowerCase();
  const matches = SUPPORT_INSTITUTIONS.filter((institution) =>
    institution.matchKeywords.some((keyword) => keyword !== 'all' && haystack.includes(keyword))
  );

  const unique = new Map<string, SupportInstitution>();
  for (const item of matches) {
    unique.set(item.name, item);
  }

  // Keep list concise and relevant on print and screen.
  return Array.from(unique.values()).slice(0, 3);
};

export const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-moss/10 border-l-4 border-moss p-8 rounded-r-2xl">
        <p className="text-moss text-xl font-display font-bold leading-relaxed">{data.personalNote}</p>
      </motion.div>

      <section className="space-y-4">
        {data.recommendations.map((item, index) => (
          <article key={`${item.title}-${index}`} className="bg-white border border-border-mgm rounded-2xl p-6">
            <h3 className="font-display font-bold text-2xl text-ink mb-2">{index + 1}. {item.title}</h3>
            <p className="text-txt-secondary mb-4">{item.description}</p>
            <p className="text-sm mb-2"><span className="font-bold">Why this fits:</span> {item.whyItFits}</p>
            <p className="text-sm mb-1"><span className="font-bold">Estimated startup cost:</span> {item.estimatedStartupCost}</p>
            <p className="text-sm mb-3"><span className="font-bold">Potential income:</span> {item.potentialIncomeRange}</p>
            {item.firstSteps.length > 0 && (
              <ul className="list-disc pl-6 text-sm space-y-1">
                {item.firstSteps.map((step, stepIndex) => (
                  <li key={`${item.title}-${stepIndex}`}>{step}</li>
                ))}
              </ul>
            )}

            <div className="mt-5 pt-4 border-t border-border-mgm/70">
              <h4 className="text-base font-bold text-ink mb-2">Local Support & Grants</h4>
              {(() => {
                const institutions = getSupportInstitutionsForRecommendation(item.title, item.description);
                if (institutions.length === 0) {
                  return (
                    <p className="text-sm text-txt-secondary leading-relaxed">
                      Not sure where to start? Contact the ASU Small Business Development Center — free consulting for all Montgomery residents:{' '}
                      <a
                        href="https://asbtdc.aum.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ember hover:text-ember-hover underline"
                      >
                        asbtdc.aum.edu
                      </a>{' '}
                      or call (334) 229-4138
                    </p>
                  );
                }

                return (
                  <ul className="space-y-2 text-sm">
                    {institutions.map((institution) => (
                      <li key={`${item.title}-${institution.name}`}>
                        <a
                          href={institution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ember hover:text-ember-hover underline font-medium"
                        >
                          {institution.name}
                        </a>
                        <span className="text-txt-secondary"> — {institution.description}</span>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
          </article>
        ))}
      </section>

      <div className="no-print flex flex-col items-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-5 py-3 bg-ember text-paper hover:bg-ember-hover transition-colors"
        >
          Print / Save as PDF
        </button>

        <button onClick={onReset} className="text-sm font-bold text-txt-secondary hover:text-ink transition-colors">
          Start Over with New Profile
        </button>
      </div>
    </div>
  );
};
