"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { markSignedIn } from "@/app/lib/session-flow";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    markSignedIn();
    router.replace("/main/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_20%_20%,rgba(13,99,27,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
      <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold">Welcome Back</p>
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Sign in normally</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">Use your account to enter the interactive app. This page stays available for normal returning users.</p>

        <div className="mt-8 space-y-4">
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
          onClick={handleSignIn}
          className="mt-8 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container text-white py-3.5 font-bold uppercase tracking-wider text-sm shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-transform"
        >
          Sign in and open app
        </button>

        <p className="mt-5 text-center text-sm text-stone-600">
          New here?{" "}
          <Link href="/signup" className="font-bold text-green-700 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
