import { FC, useMemo } from 'react';

interface Props {
  data: Order
  type: IndicatorType
  maxTotal: number
}

export const Indicator: FC<Props> = ({ data, type, maxTotal }) => {
  const [price, size, total] = data

  const stop = useMemo(() => {
    const value = ((total / (maxTotal ?? 1)) * 100)

    return value
  }, [total, maxTotal])

  const background = useMemo(() => {
    if(type === 'buy') {
      return `linear-gradient(to left, #22c55e ${stop}%, transparent ${stop}%)`
    }

    return `linear-gradient(to right, #ef4444 ${stop}%, transparent ${stop}%)`
  }, [type, stop]);

  return (
    <div style={{ background }}>PRICE: {price}, SIZE: {size}, TOTAL: {total}</div>
  )
}
