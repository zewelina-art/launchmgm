import React, { useState } from 'react';
import { DollarSign, Clock, Target, ShieldAlert, Wrench, Heart, Car, Users, Home, Building, Briefcase, Truck, Sparkles, Paintbrush, Scissors, Computer, Handshake, Shield, BookOpen, Warehouse, Share2, HeartHandshake, Music } from 'lucide-react';

export interface UserProfile {
  neighborhood: string;
  employmentStatus: string;
  skills: string[];
  otherSkills: string;
  capital: number;
  vehicle: string;
  weeklyHours: string;
  supportNetwork: string;
  workspace: string;
  preferredArea: string;
  barriers: string;
}

// Definicje typów i stałych
const neighborhoods = ['West Montgomery', 'Downtown Montgomery', 'Capitol Heights', 'Chisholm', 'Mobile Heights', 'Normandale', 'East Montgomery', 'Old Cloverdale / Garden District', 'Dalraida', 'Other Montgomery Neighborhood'];
const employmentSituations = ['Unemployed', 'Underemployed', 'Working multiple part-time jobs', 'Retired or on disability', 'Recently laid off', 'Student or recent graduate', 'Employed, seeking supplemental income'];
const skillsOptions = [
  { id: 'cooking', label: 'Cooking / Food', icon: <Sparkles size={14} /> },
  { id: 'driving', label: 'Driving / Delivery', icon: <Truck size={14} /> },
  { id: 'cleaning', label: 'Cleaning / Janitorial', icon: <Paintbrush size={14} /> },
  { id: 'caregiving', label: 'Child or Elder Care', icon: <HeartHandshake size={14} /> },
  { id: 'construction', label: 'Construction / Repair', icon: <Wrench size={14} /> },
  { id: 'landscaping', label: 'Landscaping / Outdoor', icon: <Sparkles size={14} /> },
  { id: 'sewing', label: 'Sewing / Tailoring', icon: <Scissors size={14} /> },
  { id: 'hair', label: 'Hair / Beauty', icon: <Sparkles size={14} /> },
  { id: 'it', label: 'IT / Computers', icon: <Computer size={14} /> },
  { id: 'sales', label: 'Sales / Customer Service', icon: <Handshake size={14} /> },
  { id: 'security', label: 'Security', icon: <Shield size={14} /> },
  { id: 'tutoring', label: 'Tutoring / Teaching', icon: <BookOpen size={14} /> },
  { id: 'logistics', label: 'Logistics / Warehouse', icon: <Warehouse size={14} /> },
  { id: 'marketing', label: 'Social Media / Marketing', icon: <Share2 size={14} /> },
  { id: 'health', label: 'Healthcare / First Aid', icon: <HeartHandshake size={14} /> },
  { id: 'music', label: 'Music / Entertainment', icon: <Music size={14} /> },
];
const vehicleOptions = ['No vehicle', 'Yes - Car', 'Yes - Pickup or Van', 'Bicycle / Scooter'];
const hoursOptions = ['Less than 10h/week', '10-20h/week', '20-30h/week', 'Full-time (35-40h)', 'More than 40h'];
const supportOptions = ['On my own', 'Family can help', 'Have a business partner', 'Strong community connections'];
const spaceOptions = ['Renting or own apartment/house', 'Access to a home kitchen', 'Garage or outdoor space', 'Limited space'];
const areaOptions = ['No preference / All of Montgomery', 'Near Inland Port (South Montgomery)', 'Near Meta Datacenter', 'Near Maxwell AFB', 'Downtown / Whitewater Park', 'Civil Rights Tourism Corridor', 'I want to stay in my neighborhood'];

// Props
interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    neighborhood: '',
    employmentStatus: '',
    skills: [],
    otherSkills: '',
    capital: 500,
    vehicle: '',
    weeklyHours: '',
    supportNetwork: '',
    workspace: '',
    preferredArea: '',
    barriers: '',
  });

  const handleSkillsChange = (skillId: string) => {
    setProfile(p => ({
      ...p,
      skills: p.skills.includes(skillId) ? p.skills.filter(s => s !== skillId) : [...p.skills, skillId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 profile={profile} setProfile={setProfile} handleSkillsChange={handleSkillsChange} />;
      case 2:
        return <Step2 profile={profile} setProfile={setProfile} />;
      case 3:
        return <Step3 profile={profile} setProfile={setProfile} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-border-mgm shadow-xl shadow-ember/5 space-y-10">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold font-display tracking-tight">Step {step} of 3: Tell Us About You</h3>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-ember' : 'bg-gray-200'} transition-colors`} />
          ))}
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between items-center pt-6 border-t border-border-mgm/50">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(s => s - 1)} className="text-sm font-bold text-gray-600 hover:text-ink">Back</button>
        ) : <div />}
        {step < 3 ? (
          <button type="button" onClick={() => setStep(s => s + 1)} className="px-6 py-3 bg-ink text-paper font-bold rounded-[10px] hover:bg-gray-800 transition-colors">Next</button>
        ) : (
          <button type="submit" disabled={isLoading} className="w-full md:w-auto px-8 py-4 bg-ember text-paper font-bold rounded-[10px] hover:bg-ember-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md">
            {isLoading ? (
              <><div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" /> Analyzing...</>
            ) : "Find My Opportunities"}
          </button>
        )}
      </div>
    </form>
  );
};

// Helper for styling form elements
const labelClasses = "flex items-center gap-2 text-sm font-bold text-ink mb-2";
const selectClasses = "w-full p-3 bg-gray-50 border border-border-mgm rounded-[10px] focus:ring-2 focus:ring-ember focus:border-ember transition-all";
const inputClasses = "w-full p-3 bg-gray-50 border border-border-mgm rounded-[10px] focus:ring-2 focus:ring-ember focus:border-ember transition-all";

// --- STEP 1 COMPONENT ---
const Step1 = ({ profile, setProfile, handleSkillsChange }) => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <label className={labelClasses}><Building size={14} /> Your Neighborhood</label>
        <select className={selectClasses} value={profile.neighborhood} onChange={e => setProfile({ ...profile, neighborhood: e.target.value })} required>
          <option value="" disabled>Select your neighborhood</option>
          {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClasses}><Briefcase size={14} /> Your Work Situation</label>
        <select className={selectClasses} value={profile.employmentStatus} onChange={e => setProfile({ ...profile, employmentStatus: e.target.value })} required>
          <option value="" disabled>Select your situation</option>
          {employmentSituations.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
    <div>
      <label className={labelClasses}><Wrench size={14} /> Your Skills</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skillsOptions.map(skill => (
          <label key={skill.id} className={`flex items-center gap-2 p-3 rounded-[10px] border cursor-pointer transition-all ${profile.skills.includes(skill.id) ? 'bg-ember/10 border-ember' : 'bg-gray-50 border-border-mgm hover:border-gray-400'}`}>
            <input type="checkbox" checked={profile.skills.includes(skill.id)} onChange={() => handleSkillsChange(skill.id)} className="hidden" />
            {skill.icon} <span className="text-xs font-bold">{skill.label}</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <label className={labelClasses}><Heart size={14} /> Other Skill, Passion, or Experience</label>
      <input type="text" placeholder="Tell us anything - even if you don't know if it 'counts' as a skill" className={inputClasses} value={profile.otherSkills} onChange={e => setProfile({ ...profile, otherSkills: e.target.value })} />
    </div>
  </div>
);

// --- STEP 2 COMPONENT ---
const Step2 = ({ profile, setProfile }) => (
  <div className="space-y-8">
    <div>
      <label className={labelClasses}><DollarSign size={14} /> Available Startup Capital</label>
      <div className="flex items-center gap-4">
        <input type="range" min="0" max="10000" step="100" value={profile.capital} onChange={e => setProfile({ ...profile, capital: Number(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ember" />
        <span className="font-bold text-lg text-ink w-24 text-right">${profile.capital.toLocaleString()}</span>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <label className={labelClasses}><Car size={14} /> Do you have a car?</label>
        <select className={selectClasses} value={profile.vehicle} onChange={e => setProfile({ ...profile, vehicle: e.target.value })} required>
          <option value="" disabled>Select an option</option>
          {vehicleOptions.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClasses}><Clock size={14} /> Available Hours Per Week</label>
        <select className={selectClasses} value={profile.weeklyHours} onChange={e => setProfile({ ...profile, weeklyHours: e.target.value })} required>
          <option value="" disabled>Select hours</option>
          {hoursOptions.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <label className={labelClasses}><Users size={14} /> Support Network</label>
        <select className={selectClasses} value={profile.supportNetwork} onChange={e => setProfile({ ...profile, supportNetwork: e.target.value })} required>
          <option value="" disabled>Select your support system</option>
          {supportOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClasses}><Home size={14} /> Access to Space</label>
        <select className={selectClasses} value={profile.workspace} onChange={e => setProfile({ ...profile, workspace: e.target.value })} required>
          <option value="" disabled>Select your available space</option>
          {spaceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  </div>
);

// --- STEP 3 COMPONENT ---
const Step3 = ({ profile, setProfile }) => (
  <div className="space-y-8">
    <div>
      <label className={labelClasses}><Target size={14} /> Preferred Area of Operation (Optional)</label>
      <select className={selectClasses} value={profile.preferredArea} onChange={e => setProfile({ ...profile, preferredArea: e.target.value })}>
        <option value="">Select a preferred area</option>
        {areaOptions.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
    <div>
      <label className={labelClasses}><ShieldAlert size={14} /> What's holding you back from starting a business? (Optional)</label>
      <textarea
        placeholder={'Examples: "I don\'t know how to get a license", "I have a criminal record", "I don\'t have childcare", "I\'m afraid to fail"'}
        className={inputClasses}
        rows={3}
        value={profile.barriers}
        onChange={e => setProfile({ ...profile, barriers: e.target.value })}
      />
    </div>
  </div>
);
