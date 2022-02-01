type Indicator = [price: number, size: number, total: number]

type IndicatorType = 'buy' | 'sell';

type IndicatorState = {
  bids: Indicator[]
  asks: Indicator[]
  product_ids: [string]
  maxTotal: number
  isPaused: boolean
}
