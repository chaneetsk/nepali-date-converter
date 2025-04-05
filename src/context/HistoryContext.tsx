'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface ConversionResult {
  from: string;
  to: string;
  type: 'nepali-to-english' | 'english-to-nepali';
  timestamp: number;
}

interface HistoryContextType {
  history: ConversionResult[];
  addToHistory: (from: string, to: string, type: ConversionResult['type']) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryContextProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ConversionResult[]>([]);

  const addToHistory = (from: string, to: string, type: ConversionResult['type']) => {
    const newResult: ConversionResult = {
      from,
      to,
      type,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newResult, ...prev].slice(0, 10));
  };

  return <HistoryContext.Provider value={{ history, addToHistory }}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
