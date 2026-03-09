import React from 'react';
import { Rocket, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'advisor' | 'blog') => void;
  onOpenTutorial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTutorial }) => {
  return (
    <footer className="border-t border-border-mgm bg-ink text-paper mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-paper rounded-lg flex items-center justify-center">
                <Rocket className="text-ink" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Launch<span className="text-ember">MGM</span>
              </span>
            </div>
            <p className="text-paper/60 text-sm font-body leading-relaxed max-w-sm">
              Empowering Montgomery, Alabama residents to discover realistic micro-business opportunities through AI-powered analysis and local economic data.
            </p>
            <p className="text-paper/40 text-xs font-body">
              © {new Date().getFullYear()} LaunchMGM. Built for the community, by the community.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-paper/40">Platform</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('advisor')}
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body"
                >
                  Business Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body"
                >
                  Local Insights Blog
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTutorial}
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-paper/40">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.montgomerychamber.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body flex items-center gap-1.5"
                >
                  MGM Chamber <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.asusbdc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body flex items-center gap-1.5"
                >
                  ASU SBDC <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kiva.org/lend-by-category/attribute_app_id/kiva_u_s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-paper/70 hover:text-paper transition-colors font-body flex items-center gap-1.5"
                >
                  Kiva Montgomery <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-paper/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-paper/30 text-xs font-body tracking-wide">
            Data sourced from Montgomery ArcGIS Open Data & City of Montgomery portals.
          </p>
          <p className="text-paper/30 text-xs font-body">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
};
