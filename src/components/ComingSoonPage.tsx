import React from 'react';
import { Rocket } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  onBackHome: () => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, onBackHome }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-ink rounded-lg flex items-center justify-center">
          <Rocket className="text-paper" size={20} />
        </div>
        <h2 className="text-2xl font-display font-medium text-ink">
          Launch<span className="text-ember">MGM</span>
        </h2>
      </div>

      <p className="text-xs uppercase tracking-[0.24em] text-txt-muted mb-4">{title}</p>
      <h3 className="text-4xl md:text-5xl font-display font-medium text-ink mb-8">Coming Soon</h3>

      <button
        type="button"
        onClick={onBackHome}
        className="px-6 py-3 bg-ember text-paper hover:bg-ember-hover transition-colors rounded-[12px]"
      >
        Back to Home
      </button>
    </div>
  );
};
