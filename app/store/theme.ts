import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

function getIsDark(theme: 'light' | 'dark' | 'system'): boolean {
  if (theme === 'system') {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : true;
  }
  return theme === 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      isDark: true,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setTheme: theme => {
        const isDark = getIsDark(theme);
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark', isDark);
        }
        set({ theme, isDark });
      },
      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === 'dark' ? 'light' : 'dark';
        get().setTheme(newTheme);
      }
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
