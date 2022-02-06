import { calculateTotals } from '../calculateTotals';

describe('calculateTotals', () => {
  it('returns empty array', () => {
    const result = calculateTotals([]);

    expect(result).toEqual([]);
  });

  it('counts totals', () => {
    const indicators = [ [ 1, 10 ], [ 2, 20 ], [ 3, 30 ] ] as any;

    const result = calculateTotals(indicators);

    expect(result).toEqual([ [ 1, 10, 10 ], [ 2, 20, 30 ], [ 3, 30, 60 ] ]);
  });
});
