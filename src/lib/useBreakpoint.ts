'use client';
import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function getBreakpoint(width: number): Breakpoint {
  return width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof window === 'undefined' ? 'desktop' : getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const check = () => {
      setBp(getBreakpoint(window.innerWidth));
    };

    check();
    window.addEventListener('resize', check);
    window.visualViewport?.addEventListener('resize', check);

    return () => {
      window.removeEventListener('resize', check);
      window.visualViewport?.removeEventListener('resize', check);
    };
  }, []);

  return bp;
}
