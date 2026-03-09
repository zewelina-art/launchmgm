import React from 'react';
import { Building2, Briefcase, Sprout, Banknote, GraduationCap, ExternalLink } from 'lucide-react';

const SUPPORT_RESOURCES = [
  {
    name: 'Montgomery SBDC',
    description: 'Free one-on-one business advising',
    url: 'https://www.montgomeryal.gov/business/access-montgomery/our-programs',
    icon: Building2,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'SCORE Montgomery',
    description: 'Free mentorship from retired executives',
    url: 'https://www.score.org/find-location/montgomery-al',
    icon: Briefcase,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    name: 'SBOSS Montgomery',
    description: 'Small Business One-Stop Shop, free capital access support, 39 Dexter Ave Suite 209, Tel: (334) 209-5010',
    url: 'https://www.sbossmgm.com',
    icon: Sprout,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'TruFund Alabama',
    description: 'Micro-loans and small business lending for Montgomery entrepreneurs',
    url: 'https://www.trufund.org/markets/alabama/small-business-lending',
    icon: Banknote,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    name: 'The Lab on Dexter',
    description: 'Tech incubator and co-working space',
    url: 'https://thelabondexter.com',
    icon: Sprout,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    name: 'Innovate Alabama',
    description: 'State grants and startup funding programs',
    url: 'https://innovatealabama.org',
    icon: GraduationCap,
    color: 'bg-purple-50 text-purple-600',
  },
];

export const LocalSupport: React.FC = () => {
  return (
    <div className="pt-20 border-t border-border-mgm/30">
      <div className="mb-12">
        <h3 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Free Local Support</h3>
        <p className="text-lg md:text-xl text-txt-secondary font-body max-w-2xl">
          Montgomery offers practical, free support to help you launch and grow your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPPORT_RESOURCES.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/95 p-8 rounded-[32px] border-2 border-border-mgm/90 hover:border-ember/50 hover:shadow-2xl hover:shadow-ember/10 transition-all duration-300 block"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${resource.color} transition-transform duration-300 group-hover:scale-110`}>
                <resource.icon size={24} />
              </div>
              <ExternalLink size={18} className="text-ember opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-display font-bold text-ink mb-2 group-hover:text-ember transition-colors">{resource.name}</h4>
            <p className="text-sm text-txt-secondary font-body leading-relaxed">{resource.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
