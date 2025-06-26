import { useEffect } from 'react';

export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifiers: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  } = {}
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrl = false, alt = false, shift = false, meta = false } = modifiers;
      
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift &&
        event.metaKey === meta
      ) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, modifiers]);
};