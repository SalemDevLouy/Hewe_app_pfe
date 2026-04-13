"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routeItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tracker", label: "Tracker" },
  { href: "/insights", label: "Insights" },
  { href: "/assessment", label: "Assessment" },
  { href: "/store", label: "Store" },
  { href: "/profile", label: "Profile" },
  { href: "/cart", label: "Cart" },
  { href: "/quiz", label: "Quiz" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function RouteSwitcher() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-30 border-b border-outline-variant/30 bg-white/85 backdrop-blur-xl md:hidden">
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {routeItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-surface-container-low text-stone-600 hover:bg-surface-container-high"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
