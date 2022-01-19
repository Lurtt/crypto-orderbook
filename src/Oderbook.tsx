import { useEffect, useRef, FC } from 'react';
import useWebSocket from 'react-use-websocket';

interface Orderbook {
  bids: Order[];
  asks: Order[];
}

const deltaReducer = (prevDelta: Order[], currDelta: Order) => {
  const [price, size] = currDelta;

  if (size === 0) {
    return prevDelta.filter(([oldPrice]) => oldPrice !== price);
  }

  if (size > 0) {
    if (prevDelta.find(([oldPrice]) => oldPrice === price)) {
      return prevDelta.map((oldDelta) => oldDelta[0] === price ? currDelta : oldDelta)
    }

    return [...prevDelta, currDelta];
  }

  return prevDelta;

}

const Row: FC<{ data: Order }> = ({ data }) => {
  const [price, size] = data
  return <div>{price}, {size}</div>
}

export const Oderbook: FC = () => {
  const refData = useRef<Orderbook>({ bids: [], asks: [] })
  const {
    lastJsonMessage,
    sendJsonMessage,
  } = useWebSocket('wss://www.cryptofacilities.com/ws/v1', {
    shouldReconnect: () => true,
  });

  // init WS
  useEffect(() => {
    sendJsonMessage({ event: "subscribe", feed: "book_ui_1", product_ids: ["PI_XBTUSD"] })
  }, [sendJsonMessage]);

  // set the snapshot
  useEffect(() => {
    if (lastJsonMessage?.feed === 'book_ui_1_snapshot') {
      refData.current = { bids: lastJsonMessage.bids, asks: lastJsonMessage.asks }
    }

    // update values against snapshot
    if (lastJsonMessage?.feed === 'book_ui_1') {
      if (lastJsonMessage.bids?.length || lastJsonMessage.asks?.length) {
        refData.current.bids = lastJsonMessage?.bids
          .reduce(deltaReducer, refData.current?.bids)
          .sort((a: Order, b: Order) => a[0] - b[0])
        refData.current.asks = lastJsonMessage?.asks
          .reduce(deltaReducer, refData.current?.asks)
          .sort((a: Order, b: Order) => b[0] - a[0])
      }
    }
  }, [lastJsonMessage])

  return (
    <div>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>BIDS/BUY</h1>
          {refData.current.bids.map((bid) => <Row key={bid[0]} data={bid} />)}
        </div>

        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <h1>ASKS/SELL</h1>
          {refData.current.asks.map((ask) => <Row key={ask[0]} data={ask} />)}
        </div>
      </div>
      <hr />


    </div>
  )
}
