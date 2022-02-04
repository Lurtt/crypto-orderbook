import { renderHook } from '@testing-library/react-hooks';

import { useNumberFormat } from '../useNumberFormat';

describe('useNumberFormat', () => {
  it('formats to default locale', () => {
    const { result } = renderHook(() => useNumberFormat());

    expect(result.current.format(100000.10)).toBe("100,000.1");
  });

  it('formats to custom locale', () => {
    const languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    languageGetter.mockReturnValue('de-DE');

    const { result } = renderHook(() => useNumberFormat());

    expect(result.current.format(100000.10)).toBe("100.000,1");
  });

  it('takes format options', () => {
    const { result } = renderHook(() => useNumberFormat({ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 4 }));

    expect(result.current.format(0.1023)).toBe("10.23%");
    expect(result.current.format(0.102345)).toBe("10.2345%");
  });
});
