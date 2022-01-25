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
