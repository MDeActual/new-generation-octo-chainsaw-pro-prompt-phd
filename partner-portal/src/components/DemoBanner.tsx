"use client";

import Link from "next/link";
import { useDemo } from "@/lib/demo-context";

export function DemoBanner() {
  const { isDemo } = useDemo();
  if (!isDemo) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-amber-300">
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <span>
          <strong>Demo Mode</strong> — All data is mocked. No Azure credentials required.
          To connect real services, configure your credentials in{" "}
          <Link href="/settings" className="underline underline-offset-2 hover:text-amber-200">
            Settings
          </Link>.
        </span>
      </div>
    </div>
  );
}
