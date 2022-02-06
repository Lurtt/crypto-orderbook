import { ascIndicators, descIndicators } from '../sortIndicators';

describe('sortIndicators', () => {
  describe('ascIndicators', () => {
    it('sorts data ascending', () => {
      const data = [ [ 4, 2, 2 ], [ 1, 3, 3 ], [ 10, 4, 4 ] ] as any;

      const result = data.sort(ascIndicators);

      expect(result).toEqual([ [ 1, 3, 3 ], [ 4, 2, 2 ], [ 10, 4, 4 ] ]);
    });
  });

  describe('descIndicators', () => {
    it('sorts data descending', () => {
      const data = [ [ 4, 2, 2 ], [ 1, 3, 3 ], [ 10, 4, 4 ] ] as any;

      const result = data.sort(descIndicators);

      expect(result).toEqual([ [ 10, 4, 4 ], [ 4, 2, 2 ], [ 1, 3, 3 ] ]);
    });
  });
});
