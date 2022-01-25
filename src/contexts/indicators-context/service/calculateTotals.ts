export const calculateTotals = (indicators: Indicator[]): Indicator[] => {
  let total = 0;

  return indicators.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};
