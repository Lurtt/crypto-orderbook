import { getTotalMaxValue } from '../getTotalMaxValue';

describe('getTotalMaxValue', () => {
  it('returns the highest total', () => {
    const state = {
      bids: [ [ 1, 2, 3 ], [ 10, 20, 30 ] ],
      asks: [ [ 4, 5, 6 ], [ 30, 20, 10 ] ],
    } as any;

    const result = getTotalMaxValue(state);

    expect(result).toEqual(30);
  });
});
