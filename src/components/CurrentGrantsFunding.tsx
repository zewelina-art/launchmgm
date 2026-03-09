import React from 'react';
import { ExternalLink } from 'lucide-react';

interface GrantProgram {
  name: string;
  amount: string;
  audience: string;
  details?: string;
  link: string;
}

const GRANT_PROGRAMS: GrantProgram[] = [
  {
    name: 'MGM S.E.E.D. Grant',
    amount: '$500 - $5,000',
    audience: 'Small businesses in Montgomery, focus on women, veterans & minorities',
    link: 'https://www.montgomeryal.gov/business/access-montgomery/mgm-s-e-e-d-grant-fund',
  },
  {
    name: 'SBOSS — Small Business One-Stop Shop',
    amount: 'Free capital access support + loans',
    audience: 'Montgomery businesses affected by COVID-19, focus on people of color and women',
    details: '39 Dexter Ave, Suite 209 | Tel: (334) 209-5010',
    link: 'https://www.sbossmgm.com',
  },
  {
    name: 'HOPE Enterprise — Small Business Access to Capital',
    amount: 'Loans up to $250,000 (up to 50% forgivable)',
    audience: 'Montgomery businesses owned by people of color and women',
    link: 'https://www.hopecu.org/product/business/special-programs/montgomery-small-business-access-to-capital-program/',
  },
  {
    name: 'NASE Growth Grant',
    amount: 'Up to $4,000',
    audience: 'Up to $4,000 quarterly grants for self-employed and micro-business owners. Must be NASE member to apply. Applications reviewed quarterly.',
    link: 'https://apply-nase-gs.smapply.io/',
  },
  {
    name: 'SBA Microloan Program',
    amount: 'Up to $50,000',
    audience: 'Small businesses and startups',
    link: 'https://www.sba.gov/funding-programs/loans/microloans',
  },
];

export const CurrentGrantsFunding: React.FC = () => {
  return (
    <section className="pt-20 border-t border-border-mgm/30">
      <div className="bg-gradient-to-r from-[#118AB2]/10 via-[#06D6A0]/10 to-[#FFD60A]/10 border border-border-mgm/70 rounded-3xl p-6 md:p-8">
      <div className="mb-10">
        <h3 className="text-3xl md:text-4xl font-display font-bold text-ink mb-3 tracking-tight">Current Grants & Funding</h3>
        <p className="text-base md:text-lg text-txt-secondary max-w-3xl">
          Explore active funding programs and grant opportunities that can help you launch or grow your business in Montgomery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {GRANT_PROGRAMS.map((program) => (
          <article key={program.name} className="bg-white border-2 border-border-mgm/90 rounded-[24px] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="mb-4">
              <span className="inline-block bg-brass/30 text-ink text-xs px-3 py-1.5 rounded-full font-medium tracking-wide">
                {program.amount}
              </span>
            </div>

            <h4 className="text-xl font-display font-medium text-ink mb-3 leading-tight">{program.name}</h4>
            <p className="text-sm text-txt-secondary leading-relaxed mb-3">
              <span className="font-medium text-ink">For:</span> {program.audience}
            </p>
            {program.details && <p className="text-sm text-txt-secondary mb-5">{program.details}</p>}

            <a
              href={program.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-ember text-paper hover:bg-ember-hover transition-colors rounded-[12px] mt-auto"
            >
              Apply Now <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
};
