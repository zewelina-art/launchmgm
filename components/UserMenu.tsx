import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, LogOut, HelpCircle, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onOpenAuth: () => void;
  onOpenTutorial: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenAuth, onOpenTutorial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      {user ? (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-surface hover:bg-border-mgm px-3 py-1.5 rounded-full transition-colors"
        >
          <div className="w-6 h-6 bg-ink rounded-full flex items-center justify-center text-sm text-paper font-bold">
            {user.email[0].toUpperCase()}
          </div>
          <span className="text-sm font-bold text-txt-secondary hidden sm:block font-body">{user.email.split('@')[0]}</span>
          <ChevronDown size={14} className={`text-txt-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <button 
          onClick={onOpenAuth}
          className="text-sm font-bold text-ink hover:text-ember transition-colors font-body"
        >
          Sign In
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-paper rounded-2xl shadow-xl border border-border-mgm py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-border-mgm/50 mb-2 font-body">
                <p className="text-sm font-bold uppercase tracking-widest text-txt-muted">Signed in as</p>
                <p className="text-sm font-bold text-ink truncate">{user?.email}</p>
              </div>
              
              <button 
                onClick={() => { onOpenTutorial(); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-txt-secondary hover:bg-surface hover:text-ink transition-colors font-body"
              >
                <HelpCircle size={18} />
                Tutorial
              </button>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-txt-secondary hover:bg-surface hover:text-ink transition-colors font-body"
              >
                <Settings size={18} />
                Settings
              </button>

              <div className="h-px bg-border-mgm my-2" />
              
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-err hover:bg-err/10 transition-colors font-body"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
