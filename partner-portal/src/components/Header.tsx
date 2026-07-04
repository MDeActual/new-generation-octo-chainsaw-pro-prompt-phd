"use client";

import { useDemo } from "@/lib/demo-context";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/tenants": "Customer Tenants",
  "/security": "Security",
  "/compliance": "Compliance",
  "/partner-ops": "Partner Operations",
  "/identity": "Identity & Access",
  "/automation": "Automation",
  "/settings": "Settings",
};

export function Header() {
  const { isDemo } = useDemo();
  const pathname = usePathname();
  const title = Object.entries(PAGE_TITLES).find(([k]) => k === "/" ? pathname === "/" : pathname.startsWith(k))?.[1] ?? "";

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[#1e2230] bg-[#0f1117] shrink-0">
      <h1 className="text-white font-semibold text-base">{title}</h1>
      <div className="flex items-center gap-3">
        {isDemo && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Demo Mode
          </span>
        )}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">PS</div>
      </div>
    </header>
  );
}
