import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Lightbulb, Award, Map, AlertCircle, ExternalLink, Info } from 'lucide-react';

interface ResultsViewProps {
  data: any;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Personal Note */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-moss/10 border-l-4 border-moss p-8 rounded-r-2xl shadow-sm"
      >
        <p className="text-moss text-xl font-display font-bold leading-relaxed">
          {data.personalNote}
        </p>
      </motion.div>

      {/* Barrier Response */}
      {data.barrierResponse && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface p-6 rounded-xl border border-border-mgm"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="text-txt-secondary shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-ink mb-1">Addressing Your Barriers</h3>
              <p className="text-txt-secondary leading-relaxed">{data.barrierResponse}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Business Niches */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brass/10 rounded-xl flex items-center justify-center">
            <Lightbulb className="text-brass" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Recommended Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.niches.map((niche: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-white border border-border-mgm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <h3 className="text-xl font-display font-bold text-ink mb-3">{niche.title}</h3>
              <p className="text-txt-secondary font-body mb-6 leading-relaxed">{niche.description}</p>
              <div className="space-y-4">
                <div className="bg-paper p-4 rounded-xl border border-border-mgm/50">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-txt-muted block mb-2">Why it works in MGM</span>
                  <p className="text-ink text-sm font-body leading-relaxed">{niche.whyItWorks}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border-mgm/50">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-txt-muted block mb-1">Startup Cost</span>
                    <span className="text-xl font-display font-black text-ember">{niche.estimatedStartupCost}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold uppercase tracking-widest text-txt-muted block mb-1">Potential</span>
                    <span className="text-xl font-display font-black text-ink">{niche.potentialIncome}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brass/10 rounded-xl flex items-center justify-center">
            <Map className="text-brass" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Your 7-Day Roadmap</h2>
        </div>
        <div className="relative space-y-10 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-mgm">
          {data.roadmap.map((step: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="relative pl-14"
            >
              <div className="absolute left-0 top-1 w-10 h-10 bg-ink text-paper rounded-full flex items-center justify-center font-display font-black text-lg z-10 shadow-md">
                {step.step}
              </div>
              <div className="bg-white border border-border-mgm p-6 rounded-2xl shadow-sm">
                <p className="text-ink font-display font-bold text-xl mb-2">{step.action}</p>
                <span className="text-sm text-txt-muted font-bold uppercase tracking-[0.2em] block">{step.timeframe}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-moss/10 rounded-xl flex items-center justify-center">
              <Award className="text-moss" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Grants & Funding</h2>
          </div>
          <div className="space-y-6">
            {data.grants.map((grant: any, idx: number) => (
              <div key={idx} className="bg-white border border-border-mgm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-display font-bold text-ink">{grant.name}</h3>
                  <span className="bg-moss/10 text-moss text-sm font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">{grant.amount}</span>
                </div>
                <p className="text-txt-secondary font-body text-sm mb-4 leading-relaxed">{grant.description}</p>
                {grant.link && (
                  <a href={grant.link} target="_blank" rel="noopener noreferrer" className="text-ember text-sm font-bold flex items-center gap-2 hover:text-ember-hover transition-colors">
                    Learn More <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-moss/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-moss" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Local Resources</h2>
          </div>
          <div className="space-y-6">
            {data.resources.map((res: any, idx: number) => (
              <div key={idx} className="bg-white border border-border-mgm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-display font-bold text-ink mb-2">{res.name}</h3>
                <p className="text-txt-secondary font-body text-sm leading-relaxed">{res.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Data Note */}
      <div className="bg-surface p-4 rounded-lg border border-border-mgm flex items-start gap-3">
        <Info className="text-txt-muted shrink-0 mt-0.5" size={16} />
        <p className="text-txt-muted text-sm leading-relaxed">
          {data.dataNote}
        </p>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="text-txt-muted hover:text-ink font-medium text-sm transition-colors"
        >
          Start Over with New Profile
        </button>
      </div>
    </div>
  );
};
