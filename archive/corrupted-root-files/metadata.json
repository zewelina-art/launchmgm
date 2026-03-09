import React from 'react';
import { Building2, Briefcase, Sprout, Banknote, GraduationCap, ExternalLink } from 'lucide-react';

const SUPPORT_RESOURCES = [
  {
    name: 'Montgomery SBDC',
    description: 'Free business counseling · ASU campus',
    icon: Building2,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'SCORE Montgomery',
    description: 'Free mentorship from retired executives',
    icon: Briefcase,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    name: 'AAMU SBDC',
    description: 'Small business development, free workshops',
    icon: Sprout,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: 'Neighborhood Concepts Inc.',
    description: 'CDFI micro-loans for West Montgomery entrepreneurs',
    icon: Banknote,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    name: 'TechMGM / Innovate Alabama',
    description: 'Tech startup resources, grants up to $25k',
    icon: GraduationCap,
    color: 'bg-purple-50 text-purple-600',
  },
];

export const LocalSupport: React.FC = () => {
  return (
    <div className="pt-20 border-t border-border-mgm/30">
      <div className="mb-12">
        <h3 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">
          Free Local Support 🤝
        </h3>
        <p className="text-lg md:text-xl text-txt-secondary font-body max-w-2xl">
          Montgomery offers a wealth of free resources to help you start and grow your business. Connect with these local organizations today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPPORT_RESOURCES.map((resource, index) => (
          <div 
            key={index}
            className="group bg-white p-8 rounded-[32px] border border-border-mgm hover:border-ember/30 hover:shadow-xl hover:shadow-ember/5 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${resource.color} transition-transform duration-500 group-hover:scale-110`}>
                <resource.icon size={24} />
              </div>
              <ExternalLink size={18} className="text-txt-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-xl font-display font-bold text-ink mb-2 group-hover:text-ember transition-colors">
              {resource.name}
            </h4>
            <p className="text-sm text-txt-secondary font-body leading-relaxed">
              {resource.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
