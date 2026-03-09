import React from 'react';
import { Rocket } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'advisor' | 'blog') => void;
  onOpenComingSoon: (pageTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenComingSoon }) => {
  return (
    <footer className="border-t border-border-mgm mt-20 bg-paper/70">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <button
              type="button"
              onClick={() => onNavigate('advisor')}
              className="flex items-center gap-2 mb-3 hover:opacity-90 transition-opacity"
              aria-label="Go to LaunchMGM home"
            >
              <span className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
                <Rocket className="text-paper" size={16} />
              </span>
              <p className="font-display font-black text-2xl text-ink">LaunchMGM</p>
            </button>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Empowering Montgomery residents to discover and launch sustainable micro-businesses through data-driven insights and local support.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ink mb-3">Platform</p>
            <div className="space-y-2 text-sm">
              <button onClick={() => onNavigate('advisor')} className="block text-txt-secondary hover:text-ember transition-colors text-left">
                Business Advisor
              </button>
              <button onClick={() => onNavigate('blog')} className="block text-txt-secondary hover:text-ember transition-colors text-left">
                Growth Insights Blog
              </button>
              <button onClick={() => onOpenComingSoon('How it Works')} className="block text-txt-secondary hover:text-ember transition-colors text-left">
                How it Works
              </button>
              <button onClick={() => onOpenComingSoon('Success Stories')} className="block text-txt-secondary hover:text-ember transition-colors text-left">
                Success Stories
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ink mb-3">Local Resources</p>
            <div className="space-y-2 text-sm">
              <a href="https://www.montgomeryal.gov/" target="_blank" rel="noopener noreferrer" className="block text-txt-secondary hover:text-ember transition-colors">
                City of Montgomery
              </a>
              <a href="https://www.montgomerychamber.com/" target="_blank" rel="noopener noreferrer" className="block text-txt-secondary hover:text-ember transition-colors">
                Chamber of Commerce
              </a>
              <a
                href="https://www.montgomeryal.gov/business/access-montgomery/mgm-s-e-e-d-grant-fund"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-txt-secondary hover:text-ember transition-colors"
              >
                MGM S.E.E.D. Grant — $500-$5,000 grants for small businesses
              </a>
              <a
                href="https://www.montgomeryal.gov/work/business-resources/license-and-revenue"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-txt-secondary hover:text-ember transition-colors"
              >
                Business Licensing — City of Montgomery License & Revenue Division, 25 Washington Ave, (334) 625-2036
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ink mb-3">Get in Touch</p>
            <div className="space-y-2 text-sm text-txt-secondary">
              <p>103 N Perry St, Montgomery, AL 36104</p>
              <a href="mailto:hello@launchmgm.com" className="hover:text-ember transition-colors">
                hello@launchmgm.com
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full bg-ember">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-sm text-paper/95">© 2026 LaunchMGM. All rights reserved. Made with ❤️ in Montgomery.</p>
          <div className="flex items-center gap-5 text-sm">
            <button onClick={() => onOpenComingSoon('Privacy Policy')} className="text-paper/90 hover:text-paper transition-colors text-left">
              Privacy Policy
            </button>
            <button onClick={() => onOpenComingSoon('Terms of Service')} className="text-paper/90 hover:text-paper transition-colors text-left">
              Terms of Service
            </button>
            <button onClick={() => onOpenComingSoon('Accessibility')} className="text-paper/90 hover:text-paper transition-colors text-left">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
