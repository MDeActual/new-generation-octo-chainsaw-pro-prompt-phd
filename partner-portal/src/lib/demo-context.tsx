"use client";

import React, { createContext, useContext, useState } from "react";

interface DemoContextValue {
  isDemo: boolean;
  setIsDemo: (v: boolean) => void;
}

const DemoContext = createContext<DemoContextValue>({
  isDemo: true,
  setIsDemo: () => {},
});

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(true);
  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
