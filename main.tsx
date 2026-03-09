import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileForm } from './components/ProfileForm';
import { ResultsView } from './components/ResultsView';
import { LiveMarketData } from './components/LiveMarketData';
import { Blog } from './components/Blog';
import { LocalSupport } from './components/LocalSupport';
import { Footer } from './components/Footer';
import { HeroGraphic } from './components/HeroGraphic';
import { BLOG_POSTS } from './constants/blogData';
import { getBusinessAdvice, UserProfile } from './services/gemini';
import { Rocket, Clock, ChevronRight } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { UserMenu } from './components/UserMenu';
import { Tutorial } from './components/Tutorial';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = React.useState(false);
  const [view, setView] = React.useState<'advisor' | 'blog'>('advisor');
  const { user, token } = useAuth();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsTutorialOpen(true);
    }
  }, []);

  const handleTutorialClose = () => {
    setIsTutorialOpen(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const handleProfileSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const advice = await getBusinessAdvice(profile);
      setResults(advice);
      
      // Save profile if logged in
      if (user && token) {
        await fetch('/api/profile', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ profile, results: advice }),
        });
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-ember/20">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Tutorial isOpen={isTutorialOpen} onClose={handleTutorialClose} />

      {/* Header */}
      <header className="border-b border-border-mgm bg-paper/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
              <Rocket className="text-paper" size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Launch<span className="text-ember">MGM</span></h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-txt-secondary">
              <span 
                className={`cursor-pointer transition-colors ${view === 'advisor' ? 'text-ink font-bold' : 'hover:text-ink'}`}
                onClick={() => { setView('advisor'); handleReset(); }}
              >
                Advisor
              </span>
              <span 
                className={`cursor-pointer transition-colors ${view === 'blog' ? 'text-ink font-bold' : 'hover:text-ink'}`}
                onClick={() => setView('blog')}
              >
                Blog
              </span>
              <span className="hover:text-ink cursor-pointer transition-colors" onClick={() => setIsTutorialOpen(true)}>Help</span>
            </div>
            <UserMenu onOpenAuth={() => setIsAuthOpen(true)} onOpenTutorial={() => setIsTutorialOpen(true)} />
          </div>
        </div>
      </header>
      
      {/* Hero Banner Graphic */}
      {view === 'advisor' && (
        <div className="w-full h-[300px] md:h-[450px] overflow-hidden relative">
          <HeroGraphic />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper/30 pointer-events-none" />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {view === 'blog' ? (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Blog onBack={() => setView('advisor')} />
            </motion.div>
          ) : !results ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-display font-black text-ink leading-[0.95] tracking-tight">
                  You have a skill. <br />
                  <span className="text-ember">Montgomery has gaps.</span>
                </h2>
                <p className="text-lg md:text-xl text-txt-secondary leading-relaxed max-w-2xl mx-auto font-body">
                  We analyze local city data, economic investments, and your unique skills to find the perfect micro-business opportunity for you.
                </p>
              </div>

              {error && (
                <div className="max-w-2xl mx-auto bg-err/10 border border-err/20 text-err px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <ProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
              <LiveMarketData />

              {/* Featured Blog Section */}
              <div className="pt-20 border-t border-border-mgm/30">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">
                      Latest Local Insights
                    </h3>
                    <p className="text-lg md:text-xl text-txt-secondary font-body">
                      Stay informed with our deep dives into the Montgomery economy and emerging business trends.
                    </p>
                  </div>
                  <button 
                    onClick={() => setView('blog')}
                    className="group flex items-center gap-2 text-sm font-bold text-ember uppercase tracking-widest hover:text-ink transition-colors"
                  >
                    View All Articles <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <div 
                      key={post.id}
                      onClick={() => setView('blog')}
                      className="group cursor-pointer bg-white rounded-[32px] border border-border-mgm overflow-hidden flex flex-col hover:shadow-xl hover:shadow-ember/5 transition-all duration-500"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-ink text-paper text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {post.category}
                          </span>
                          <span className="text-txt-muted text-[10px] font-medium flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                          </span>
                        </div>
                        <h4 className="text-xl font-display font-bold text-ink mb-3 group-hover:text-ember transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-txt-secondary mb-6 font-body leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-ink uppercase tracking-widest">
                          Read More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <LocalSupport />
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ResultsView data={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer 
        onNavigate={(v) => { setView(v); if(v === 'advisor') handleReset(); }} 
        onOpenTutorial={() => setIsTutorialOpen(true)} 
      />
    </div>
  );
}
