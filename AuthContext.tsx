import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-paper rounded-2xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-txt-muted hover:text-ink transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-display font-bold text-ink mb-2">
                {isLogin ? 'Welcome Back' : 'Join LaunchMGM'}
              </h2>
              <p className="text-txt-secondary text-sm mb-8 font-body">
                {isLogin ? 'Sign in to access your saved business plans.' : 'Create an account to save your progress.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-err/10 text-err text-sm p-3 rounded-lg border border-err/20 font-body">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-txt-muted mb-1.5 font-body">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" size={16} />
                    <input 
                      type="email" 
                      required
                      className="w-full bg-surface border border-border-mgm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-ember outline-none transition-all font-body"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-txt-muted mb-1.5 font-body">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" size={16} />
                    <input 
                      type="password" 
                      required
                      className="w-full bg-surface border border-border-mgm rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-ember outline-none transition-all font-body"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-ember text-paper font-bold py-3 rounded-[10px] hover:bg-ember-hover transition-all shadow-md disabled:opacity-50 font-body"
                >
                  {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-border-mgm text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-txt-secondary hover:text-ink text-sm font-bold transition-colors font-body"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
