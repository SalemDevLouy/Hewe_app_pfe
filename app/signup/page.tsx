"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleCreateAccount = () => {
    // Fake signup for UI flow demo.
    router.replace("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_15%_15%,rgba(13,99,27,0.16),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
      <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold">Step 2 • Account Setup</p>
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Create your account</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">Your quiz is complete. Create an account to save your fake personalization profile and continue.</p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600"
          />
        </div>

        <button
          type="button"
          onClick={handleCreateAccount}
          className="mt-6 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container text-white py-3.5 font-bold uppercase tracking-wider text-sm shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-transform"
        >
          Create account
        </button>

        <p className="mt-5 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-green-700 hover:underline">
            Sign in normally
          </Link>
        </p>
      </div>
    </div>
  );
}
