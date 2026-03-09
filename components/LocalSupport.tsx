import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Building2, GraduationCap, Banknote, Cpu, Coins, TrendingUp } from 'lucide-react';

const supportOrgs = [
  {
    name: 'Montgomery Chamber of Commerce',
    description: 'Mentoring, networking events, and business advocacy for Montgomery entrepreneurs.',
    icon: Building2,
    link: 'https://www.montgomerychamber.com',
    color: 'bg-ember/10 text-ember',
  },
  {
    name: 'ASU Small Business Development Center',
    description: 'Free one-on-one consulting, business plan development, and financial advising.',
    icon: GraduationCap,
    link: 'https://www.asusbdc.com',
    color: 'bg-moss/10 text-moss',
  },
  {
    name: 'Kiva Montgomery',
    description: 'Crowdfunded micro-loans with 0% interest for local entrepreneurs.',
    icon: Coins,
    link: 'https://www.kiva.org',
    color: 'bg-brass/10 text-brass',
  },
  {
    name: 'City Micro-Grants',
    description: 'Periodic city-funded grants for neighborhood-based businesses, up to $2,500.',
    icon: Banknote,
    link: 'https://www.montgomeryAL.gov',
    color: 'bg-moss/10 text-moss',
  },
  {
    name: 'The Lab on Dexter',
    description: 'Tech-focused incubator and co-working space for Montgomery innovators.',
    icon: Cpu,
    link: 'https://www.thelabondexter.com',
    color: 'bg-ember/10 text-ember',
  },
  {
    name: 'Montgomery County Revolving Loan Fund',
    description: 'Low-interest loans designed to help job-creating businesses launch and grow.',
    icon: TrendingUp,
    link: 'https://www.montgomeryAL.gov',
    color: 'bg-brass/10 text-brass',
  },
];

export const LocalSupport: React.FC = () => {
  return (
    <div className="pt-20 border-t border-border-mgm/30">
      <div className="mb-12">
        <h3 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">
          Local Support Network
        </h3>
        <p className="text-lg text-txt-secondary font-body max-w-2xl">
          Montgomery has a strong ecosystem of organizations ready to help you launch. These resources are free or low-cost and built for residents just like you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportOrgs.map((org, index) => (
          <motion.a
            key={org.name}
            href={org.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group bg-white border border-border-mgm/40 p-6 rounded-2xl hover:border-ember/30 hover:shadow-xl hover:shadow-ember/5 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${org.color.split(' ')[0]}`}>
                <org.icon size={20} className={org.color.split(' ')[1]} />
              </div>
              <ExternalLink
                size={14}
                className="text-txt-muted group-hover:text-ember transition-colors"
              />
            </div>
            <h4 className="text-base font-display font-bold text-ink mb-2 group-hover:text-ember transition-colors leading-tight">
              {org.name}
            </h4>
            <p className="text-sm text-txt-secondary font-body leading-relaxed flex-grow">
              {org.description}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
