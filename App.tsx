import { useState } from 'react';
import { ProfileForm, UserProfile } from './src/components/ProfileForm';

export default function App() {
  const [submittedProfile, setSubmittedProfile] = useState<UserProfile | null>(null);

  return (
    <div className="min-h-screen bg-paper text-ink px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight">
            LaunchMGM
          </h1>
          <p className="text-txt-secondary font-body">
            Complete your profile to discover local business opportunities.
          </p>
        </header>

        <ProfileForm
          isLoading={false}
          onSubmit={(profile) => {
            setSubmittedProfile(profile);
          }}
        />

        {submittedProfile && (
          <section className="bg-white border border-border-mgm rounded-2xl p-5">
            <h2 className="font-bold mb-2">Profile submitted</h2>
            <pre className="text-xs whitespace-pre-wrap break-words">
              {JSON.stringify(submittedProfile, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}
