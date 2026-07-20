import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);

      if (!stored) {
        return initialValue;
      }

      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue: React.Dispatch<
    React.SetStateAction<T>
  > = (newValue) => {
    setValue((prev) => {
      const valueToStore =
        newValue instanceof Function
          ? newValue(prev)
          : newValue;

      try {
        localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );
      } catch {}

      return valueToStore;
    });
  };

  return [value, setStoredValue];
}