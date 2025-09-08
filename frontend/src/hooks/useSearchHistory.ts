import { useState, useEffect } from 'react';
import { SearchHistoryItem } from '../types/flight';

const STORAGE_KEY = 'flight_search_history';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse search history:', err);
      }
    }
  }, []);

  const addToHistory = (item: Omit<SearchHistoryItem, 'id' | 'timestamp'> & { type: 'oneway' | 'roundtrip' }) => {
    const newItem: SearchHistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    const updatedHistory = [
      newItem,
      ...history.filter(h => 
        !(h.dcity === item.dcity && h.acity === item.acity && h.date === item.date)
      ),
    ].slice(0, 10); // Keep only last 10 searches

    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    clearHistory,
  };
};