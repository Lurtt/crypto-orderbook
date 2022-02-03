import { useMemo } from 'react';

export const useNumberFormat = (options?: Intl.NumberFormatOptions) => {
  const locale = useMemo(() => navigator.language ?? 'en', []);
  
  return useMemo(() => Intl.NumberFormat(locale, options), [ options, locale ]);
};
