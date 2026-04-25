"use client";

import { useEffect, useState } from "react";

type Recommendation = {
  type: "product" | "plan" | "habit";
  name: string;
  score: number;
  reason: string;
  details: string;
};

type RecommendationResponse = {
  summary: string;
  recommendations: Recommendation[];
};

export default function Insights() {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const payload = await response.json();

        if (!response.ok) {
          setError(payload.error || "Could not generate recommendations.");
          setIsLoading(false);
          return;
        }

        setData(payload as RecommendationResponse);
      } catch {
        setError("Could not generate recommendations.");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-100px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[500px] w-[500px] rounded-full bg-secondary-container/30 blur-3xl animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-tertiary-fixed px-5 py-2">
            <span className="relative h-2.5 w-2.5 animate-ping rounded-full bg-primary" />
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-tertiary-fixed">
              Live Analysis in Progress
            </span>
          </div>
          <h2 className="mt-6 font-headline text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
            Analyzing your profile...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-20 w-full max-w-3xl px-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
          <h2 className="font-headline text-2xl font-bold text-red-900">Recommendations unavailable</h2>
          <p className="mt-3 text-sm text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-10 rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-wellness">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Health Summary</p>
        <h1 className="mt-3 font-headline text-4xl font-extrabold text-on-surface">Your Personalized Recommendations</h1>
        <p className="mt-4 max-w-3xl text-stone-600">{data?.summary}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.recommendations.map((rec) => (
          <article
            key={`${rec.type}-${rec.name}`}
            className="rounded-3xl border border-outline-variant/20 bg-white p-6 shadow-[0_14px_34px_rgba(17,24,39,0.06)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                {rec.type}
              </span>
              <span className="font-headline text-lg font-extrabold text-primary">{rec.score}</span>
            </div>

            <h2 className="font-headline text-xl font-bold text-on-surface">{rec.name}</h2>
            <p className="mt-3 text-sm text-stone-700">{rec.reason}</p>
            <p className="mt-3 text-sm text-stone-500">{rec.details}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
