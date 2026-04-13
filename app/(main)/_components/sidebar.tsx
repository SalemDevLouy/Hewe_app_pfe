"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/tracker", label: "My Plan", icon: "event_note" },
  { href: "/insights", label: "Recommendations", icon: "auto_awesome" },
  { href: "/assessment", label: "Assessment", icon: "check_circle" },
  { href: "/store", label: "Store", icon: "local_mall" },
  { href: "/profile", label: "Profile", icon: "person" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200/70 bg-slate-50/95 backdrop-blur-xl shadow-[8px_0_24px_rgba(26,28,28,0.04)] md:flex">
      <div className="px-8 py-10 flex flex-col items-start gap-2">
        <span className="text-2xl font-bold tracking-tighter text-green-900 font-headline">The Mindful Editorial</span>
        <div className="flex items-center gap-3 mt-8">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm">
            <img alt="Alex Rivers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfMpCE7h4PMOS8F-mrsokFr3_mUjevyAHerQVT_JtU8iV3PXtcj-isfRGAPD2SUQaFYl_miEHa2VLdeZVhrI-gLscGJ7F92Tt_Jy4FthZ4yWIwrmd0N8VKVKIq8yzXIXE3w5jEGJMroxN6gkIeTq9xiE2xv1YsEHMG-KqfVaQkZtVvOzLh_aZk2NfoRrPjjqP9p9y9t0bOFiS_Vn7YQB5ZHPlfCgHCQiYxA4ygkzZGMsQTNP7QAkrqr3XCt8S02ZSX9FbEq0ztbQoD"/>
          </div>
          <div>
            <h3 className="font-headline font-bold text-on-surface leading-tight">Alex Rivers</h3>
            <p className="text-xs text-stone-500 font-medium">Day 12 • Mindful Journey</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors duration-300 ${
                active
                  ? "bg-green-100/60 text-green-900 font-semibold"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6">
        <button className="w-full editorial-gradient text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 wellness-glow scale-98 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>add</span>
          {" "}Log a Habit
        </button>
      </div>
    </aside>
  );
}