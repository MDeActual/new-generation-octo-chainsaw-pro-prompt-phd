"use client";

import React, { createContext, useContext, useState } from "react";

interface DemoContextValue {
  isDemo: boolean;
  setIsDemo: (v: boolean) => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(true);
  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within <DemoProvider>.");
  }
  return ctx;
}
