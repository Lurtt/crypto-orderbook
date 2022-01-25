export const reduceDeltaIndicators = (prevDelta: Indicator[], currDelta: Indicator) => {
  const [price, size] = currDelta;

  const removeIndicatorByPrice = ([oldPrice]: Indicator) => oldPrice !== price;
  const findIndicatorByPrice = ([oldPrice]: Indicator) => oldPrice === price;
  const saveIndicator = (oldDelta: Indicator): Indicator => oldDelta[0] === price ? currDelta : oldDelta;

  if (size === 0) {
    return prevDelta.filter(removeIndicatorByPrice);
  }

  if (size > 0) {
    if (prevDelta.find(findIndicatorByPrice)) {
      return prevDelta.map(saveIndicator)
    }

    return [...prevDelta, currDelta];
  }

  return prevDelta;

}

export const ascIndicators = ([firstPrice]: Indicator, [secondPrice]: Indicator) => firstPrice - secondPrice

export const descIndicators = ([firstPrice]: Indicator, [secondPrice]: Indicator) => secondPrice - firstPrice

export const calculateTotals = (indicators: Indicator[]): Indicator[] => {
  let total = 0;

  return indicators.map(([price, size]) => {
    total = total + size;

    return [price, size, total];
  });
};

export const getTotalMaxValue = ({ bids, asks }: IndicatorState) => {
  const [, , lastBidTotal] = bids[bids.length - 1]
  const [, , lastAskTotal] = asks[asks.length - 1]

  return Math.max(lastBidTotal, lastAskTotal)
}
