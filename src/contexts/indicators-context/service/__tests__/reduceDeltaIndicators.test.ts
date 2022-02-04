import { reduceDeltaIndicators } from '../reduceDeltaIndicators';

describe('reduceDeltaIndicators', () => {
  it('removes indicator when size is zero', () => {
    const result = reduceDeltaIndicators([[ 1, 10, 10 ]], [ 2, 0, 10 ]);

    expect(result).toEqual([[ 1, 10, 10 ]]);
  });

  it('replaces indicator when price is same', () => {
    const result = reduceDeltaIndicators([[ 1, 10, 10 ]], [ 1, 200, 10 ]);

    expect(result).toEqual([[ 1, 200, 10 ]]);
  });

  it('adds indicator when price is different', () => {
    const result = reduceDeltaIndicators([[ 1, 10, 10 ]], [ 2, 200, 10 ]);

    expect(result).toEqual([ [ 1, 10, 10 ], [ 2, 200, 10 ] ]);
  });
});
