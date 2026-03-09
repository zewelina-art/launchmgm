import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Rocket, Target, Map, Award } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: TutorialStep[] = [
  {
    title: "Welcome to LaunchMGM",
    description: "We help Montgomery residents find realistic business opportunities based on their skills and local economic data.",
    icon: <Rocket className="text-ember" size={48} />
  },
  {
    title: "Build Your Profile",
    description: "Tell us about your skills, neighborhood, and available capital. We use this to match you with the right niche.",
    icon: <Target className="text-ember" size={48} />
  },
  {
    title: "Local Data Analysis",
    description: "We cross-reference your profile with Montgomery's 311 requests, construction permits, and major investments like the Inland Port.",
    icon: <Map className="text-ember" size={48} />
  },
  {
    title: "Grants & Roadmap",
    description: "Every recommendation comes with a 7-day action plan and links to local grants like Kiva MGM or ASU SBDC support.",
    icon: <Award className="text-ember" size={48} />
  }
];

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
  forceShow?: boolean;
}

export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose, forceShow = false }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentStep(0);
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-paper rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-txt-muted hover:text-ink transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="p-12 text-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-moss/10 rounded-3xl flex items-center justify-center">
                      {steps[currentStep].icon}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold text-ink">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-txt-secondary leading-relaxed text-lg font-body">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex gap-2">
                  {steps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-ember' : 'w-2 bg-border-mgm'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  {currentStep > 0 && (
                    <button 
                      onClick={handleBack}
                      className="p-3 rounded-full border border-border-mgm text-txt-muted hover:text-ink transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  <button 
                    onClick={handleNext}
                    className="bg-ember text-paper px-8 py-3 rounded-[10px] font-bold flex items-center gap-2 hover:bg-ember-hover transition-all shadow-md font-body"
                  >
                    {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
