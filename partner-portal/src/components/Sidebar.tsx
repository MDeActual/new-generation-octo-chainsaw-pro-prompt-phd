"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard", icon: "⬛" },
  { href: "/tenants", label: "Tenants", icon: "🏢" },
  { href: "/security", label: "Security", icon: "🛡️" },
  { href: "/compliance", label: "Compliance", icon: "✅" },
  { href: "/partner-ops", label: "Partner Ops", icon: "🤝" },
  { href: "/identity", label: "Identity & Access", icon: "🔑" },
  { href: "/automation", label: "Automation", icon: "⚡" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 min-h-screen bg-[#0f1117] border-r border-[#1e2230] select-none shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e2230]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">N</div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">NorthStar</p>
            <p className="text-[#6b7280] text-xs">Cloud Partners</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-blue-600 text-white font-medium"
                  : "text-[#9ca3af] hover:bg-[#1e2230] hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-[#1e2230]">
        <p className="text-[10px] text-[#4b5563] uppercase tracking-widest">MPN-4821039</p>
        <p className="text-[11px] text-[#6b7280] mt-0.5">Solutions Partner · Security</p>
      </div>
    </aside>
  );
}
