import React from 'react';
import { UserProfile } from '../services/gemini';
import { Briefcase, MapPin, Wrench, Heart, DollarSign, Car, Clock, Users, Home, Target, ShieldAlert } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = React.useState<UserProfile>({
    neighborhood: '',
    employmentStatus: '',
    skills: '',
    passions: '',
    capital: 0,
    hasVehicle: false,
    weeklyHours: 10,
    hasSupportNetwork: false,
    hasWorkspace: false,
    preferredArea: '',
    barriers: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const inputClasses = "w-full bg-white border border-border-mgm rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-ember focus:border-transparent outline-none transition-all font-body";
  const labelClasses = "flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-txt-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl border border-border-mgm shadow-sm">
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-display font-black text-ink mb-4 tracking-tight">Build Your Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}><MapPin size={14} /> Neighborhood</label>
            <input 
              type="text" 
              placeholder="e.g. Old Cloverdale"
              className={inputClasses}
              value={profile.neighborhood}
              onChange={e => setProfile({...profile, neighborhood: e.target.value})}
              required
            />
          </div>
          <div>
            <label className={labelClasses}><Briefcase size={14} /> Employment Status</label>
            <input 
              type="text" 
              placeholder="e.g. Seeking work"
              className={inputClasses}
              value={profile.employmentStatus}
              onChange={e => setProfile({...profile, employmentStatus: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClasses}><Wrench size={14} /> Core Skills</label>
            <textarea 
              placeholder="e.g. Cooking, Repairing electronics"
              className={inputClasses}
              rows={3}
              value={profile.skills}
              onChange={e => setProfile({...profile, skills: e.target.value})}
              required
            />
          </div>
          <div>
            <label className={labelClasses}><Heart size={14} /> Passions</label>
            <textarea 
              placeholder="e.g. Helping elders, Gardening"
              className={inputClasses}
              rows={3}
              value={profile.passions}
              onChange={e => setProfile({...profile, passions: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className={labelClasses}><DollarSign size={14} /> Capital ($)</label>
            <input 
              type="number" 
              className={inputClasses}
              value={profile.capital}
              onChange={e => setProfile({...profile, capital: parseInt(e.target.value) || 0})}
              min="0"
              required
            />
          </div>
          <div>
            <label className={labelClasses}><Clock size={14} /> Weekly Hours</label>
            <input 
              type="number" 
              className={inputClasses}
              value={profile.weeklyHours}
              onChange={e => setProfile({...profile, weeklyHours: parseInt(e.target.value) || 0})}
              min="1"
              required
            />
          </div>
          <div>
            <label className={labelClasses}><Target size={14} /> Preferred Area</label>
            <input 
              type="text" 
              placeholder="e.g. Downtown"
              className={inputClasses}
              value={profile.preferredArea}
              onChange={e => setProfile({...profile, preferredArea: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-border-mgm text-ember focus:ring-ember"
              checked={profile.hasVehicle}
              onChange={e => setProfile({...profile, hasVehicle: e.target.checked})}
            />
            <span className="text-sm font-medium text-txt-secondary group-hover:text-ink transition-colors flex items-center gap-1.5">
              <Car size={14} /> Vehicle Access
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-border-mgm text-ember focus:ring-ember"
              checked={profile.hasSupportNetwork}
              onChange={e => setProfile({...profile, hasSupportNetwork: e.target.checked})}
            />
            <span className="text-sm font-medium text-txt-secondary group-hover:text-ink transition-colors flex items-center gap-1.5">
              <Users size={14} /> Support Network
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-border-mgm text-ember focus:ring-ember"
              checked={profile.hasWorkspace}
              onChange={e => setProfile({...profile, hasWorkspace: e.target.checked})}
            />
            <span className="text-sm font-medium text-txt-secondary group-hover:text-ink transition-colors flex items-center gap-1.5">
              <Home size={14} /> Workspace
            </span>
          </label>
        </div>

        <div>
          <label className={labelClasses}><ShieldAlert size={14} /> Barriers / Concerns</label>
          <textarea 
            placeholder="e.g. Lack of childcare"
            className={inputClasses}
            rows={2}
            value={profile.barriers}
            onChange={e => setProfile({...profile, barriers: e.target.value})}
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-ember text-paper font-bold py-4 rounded-[10px] hover:bg-ember-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
            Analyzing Montgomery Data...
          </>
        ) : (
          "Find My Opportunities"
        )}
      </button>
    </form>
  );
};
