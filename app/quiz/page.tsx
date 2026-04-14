"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { markQuizCompleted } from "@/app/lib/session-flow";

type QuizOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  fakeInsight: string;
};

type QuizQuestion = {
  id: string;
  focus: string;
  prompt: string;
  helper: string;
  options: QuizOption[];
};

const questions: QuizQuestion[] = [
  {
    id: "energy-window",
    focus: "Lifestyle",
    prompt: "When do you usually feel your strongest energy?",
    helper: "We use this fake signal to tailor your recommended routine blocks.",
    options: [
      {
        id: "morning",
        title: "Morning Peak",
        description: "I am most focused before noon.",
        icon: "wb_sunny",
        fakeInsight: "Ideal for high-focus work between 08:00 and 11:00.",
      },
      {
        id: "midday",
        title: "Midday Balance",
        description: "My concentration is strongest around lunch time.",
        icon: "routine",
        fakeInsight: "Best for meetings and execution from 11:30 to 14:30.",
      },
      {
        id: "evening",
        title: "Evening Momentum",
        description: "I become productive after 17:00.",
        icon: "nights_stay",
        fakeInsight: "Late creative sessions can be your highest output window.",
      },
    ],
  },
  {
    id: "stress-profile",
    focus: "Recovery",
    prompt: "How has your stress level felt this week?",
    helper: "This is simulated data to preview personalized insights.",
    options: [
      {
        id: "low",
        title: "Mostly Calm",
        description: "I feel stable with occasional pressure.",
        icon: "spa",
        fakeInsight: "You can tolerate moderate performance load this week.",
      },
      {
        id: "medium",
        title: "Up and Down",
        description: "Some days are good, some feel heavy.",
        icon: "water_lux",
        fakeInsight: "Add short reset breaks every 90 minutes for better output.",
      },
      {
        id: "high",
        title: "Frequently High",
        description: "I feel mentally overloaded most days.",
        icon: "psychology_alt",
        fakeInsight: "Prioritize recovery blocks and reduce task switching.",
      },
    ],
  },
  {
    id: "goal-priority",
    focus: "Goals",
    prompt: "What is your main goal for the next 30 days?",
    helper: "Your plan preview will adapt around this objective.",
    options: [
      {
        id: "sleep",
        title: "Sleep Quality",
        description: "I want deeper and more consistent sleep.",
        icon: "bedtime",
        fakeInsight: "Evening wind-down and caffeine timing become top priorities.",
      },
      {
        id: "focus",
        title: "Deep Focus",
        description: "I need better concentration and fewer distractions.",
        icon: "target",
        fakeInsight: "Your plan emphasizes focus sprints and mental clarity rituals.",
      },
      {
        id: "fitness",
        title: "Physical Consistency",
        description: "I want to train regularly without burnout.",
        icon: "fitness_center",
        fakeInsight: "We prioritize sustainable training and recovery pacing.",
      },
    ],
  },
];

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[step];
  const selectedOptionId = answers[question.id];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const selectedInsights = useMemo(() => {
    return questions.flatMap((q) => {
      const selectedId = answers[q.id];
      if (!selectedId) {
        return [];
      }

      const selected = q.options.find((opt) => opt.id === selectedId);
      return selected ? [selected.fakeInsight] : [];
    });
  }, [answers]);

  const fakeReadiness = 64 + answeredCount * 8;
  const fakeStress = 46 - answeredCount * 5;

  const selectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const goBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleContinue = () => {
    if (!selectedOptionId) {
      return;
    }

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    markQuizCompleted();
    router.replace("/signup");
  };

  return (
    <div className="w-full relative min-h-screen pt-12 pb-32 flex flex-col">
      {/* Progress Indicator */}
      <div className="mb-12 max-w-4xl w-full mx-auto px-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#1b6d24] font-bold mb-2">Personalization Journey</span>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Curating Your Experience</h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-headline font-extrabold text-primary">{progress}%</span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Section: Asymmetric Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start max-w-4xl w-full mx-auto px-6">
        {/* Question Content */}
        <div className="md:col-span-5 lg:col-span-4 sticky top-28">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-secondary-container/50 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">Focus: {question.focus}</span>
            <h2 className="text-3xl font-headline font-extrabold leading-tight text-on-surface mb-6">{question.prompt}</h2>
            <p className="text-stone-600 leading-relaxed font-medium">{question.helper}</p>
          </div>
          <div className="hidden md:block">
            <div className="rounded-3xl p-6 bg-surface-container-low border border-outline-variant/20 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Fake Data Preview</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Readiness Index</span>
                <span className="font-headline font-bold text-primary">{fakeReadiness}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Stress Load</span>
                <span className="font-headline font-bold text-primary">{Math.max(fakeStress, 20)}%</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/30">
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">Selected Insights</p>
                <ul className="space-y-2">
                  {selectedInsights.length === 0 ? (
                    <li className="text-sm text-stone-500">Choose options to generate your fake insights.</li>
                  ) : (
                    selectedInsights.map((insight) => (
                      <li key={insight} className="text-sm text-stone-700">• {insight}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Options: Bento Style Grid */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          {question.options.map((opt) => {
            const selected = selectedOptionId === opt.id;

            return (
            <button
              type="button"
              key={opt.id}
              onClick={() => selectOption(opt.id)}
              className="group cursor-pointer block w-full text-left"
            >
               <div className={`rounded-3xl p-6 transition-all duration-300 group-active:scale-[0.98] ${
                 selected
                   ? 'bg-surface-container-lowest wellness-glow ring-2 ring-primary relative' 
                   : 'bg-surface-container-low hover:bg-surface-container-highest border border-outline-variant/10'
               }`}>
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center overflow-hidden shrink-0 ${selected ? 'bg-primary/10 text-primary' : 'bg-white text-primary wellness-glow'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>{opt.icon}</span>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-headline font-bold text-xl text-on-surface mb-1">{opt.title}</h3>
                        <p className="text-stone-500 font-medium text-sm leading-relaxed">{opt.description}</p>
                     </div>
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                       selected ? 'border-2 border-primary' : 'border-2 border-outline-variant group-hover:border-primary'
                     }`}>
                        <div className={`w-3 h-3 rounded-full bg-primary transition-transform ${selected ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                     </div>
                  </div>
               </div>
            </button>
          )})}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-10 pb-6 pt-4 border-t border-outline-variant/10">
         <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 text-stone-500 font-bold text-sm uppercase tracking-widest hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
         >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back</span>
         </button>
         <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => router.replace("/signup")}
              className="hidden sm:inline-block text-[10px] text-stone-400 font-bold uppercase tracking-widest cursor-pointer hover:text-stone-600"
            >
              Skip to signup
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedOptionId}
              className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-xl font-label text-sm font-bold tracking-widest uppercase shadow-lg shadow-primary/20 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {step === questions.length - 1 ? "Finish Quiz and Sign Up" : "Continue"}
            </button>
         </div>
      </footer>
    </div>
  );
}
