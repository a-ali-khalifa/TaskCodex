import { useState, useEffect } from "react";

export function usePersistedState<T>(
  key: string,
  initialValue: T,
  debounceMs: number = 1000,
) {
  const [value, setValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false); //determines when data is synced with localStorage.

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch {
      // Keep initialValue
    }
    setIsHydrated(true);
  }, [key]);

  // Persist to localStorage (wait until hydrated)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to save ${key}:`, error);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [key, value, debounceMs]);

  return [value, setValue, isHydrated] as const;
}
