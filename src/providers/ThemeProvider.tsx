import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

import { theme } from '@/shared/theme';

interface ThemeContextObject {
  mode: Application.ThemeMode | undefined;
  toggleMode: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'emooji-theme-mode';

const themeObject = deepMerge(grommet, theme);

const ThemeContext = createContext<ThemeContextObject>({
  mode: undefined,
  toggleMode: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<Application.ThemeMode>('light');

  const toggleMode = () => {
    const next = mode === 'light' ? 'dark' : 'light';

    localStorage.setItem(STORAGE_KEY, next);
    setMode(next);
  };

  useEffect(() => {
    const m = localStorage.getItem(STORAGE_KEY);
    const nm: Application.ThemeMode = m === 'light' ? 'light' : 'dark';

    if (m) {
      setMode(nm);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <Grommet full theme={themeObject} themeMode={mode}>
        {children}
      </Grommet>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const { mode, toggleMode } = useContext(ThemeContext);

  return { mode, toggleMode };
}
