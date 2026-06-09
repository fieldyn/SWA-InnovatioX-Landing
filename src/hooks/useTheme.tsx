import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggle: (event?: ReactMouseEvent<HTMLElement>) => void
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'dark'
  }

  const initial = document.documentElement.getAttribute('data-theme')
  if (initial === 'light' || initial === 'dark') {
    return initial
  }

  try {
    const stored = localStorage.getItem('ix-theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // ignore storage errors; theme falls back to system/default
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    try {
      localStorage.setItem('ix-theme', theme)
    } catch {
      // ignore storage errors
    }
  }, [theme])

  const toggle = useCallback((event?: ReactMouseEvent<HTMLElement>) => {
    const doc = document as DocumentWithViewTransition
    const next: Theme =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(next)
      return
    }

    // Expand the new theme as a circle from the toggle button (its center also
    // works for keyboard activation, where click coordinates are 0,0).
    const rect = event?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = doc.startViewTransition(() => {
      // The attribute drives every themed style; set it synchronously so the
      // snapshot captures the new theme even before React effects run.
      document.documentElement.setAttribute('data-theme', next)
      flushSync(() => setTheme(next))
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {
        // transition was skipped (e.g. rapid toggling); theme is already applied
      })
  }, [])

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return value
}
