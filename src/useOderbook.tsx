import { useEffect, useRef, useCallback } from 'react';
import { useDocumentVisibility } from 'ahooks'
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

export const useOderbook = () => {
  const orders = useRef<Orderbook>({ bids: [], asks: [] })
  const {
    lastJsonMessage,
    sendJsonMessage,
  } = useWebSocket('wss://www.cryptofacilities.com/ws/v1', {
    shouldReconnect: () => true,
  });
  const documentVisibility = useDocumentVisibility();

  const ascSortOrder = useCallback(([firstPrice]: Order, [secondPrice]: Order) => firstPrice - secondPrice, [])
  const descSortOrder = useCallback(([firstPrice]: Order, [secondPrice]: Order) => secondPrice - firstPrice, [])

  // init WS
  useEffect(() => {
    sendJsonMessage({ event: "subscribe", feed: "book_ui_1", product_ids: ["PI_XBTUSD"] })
  }, [sendJsonMessage]);

  useEffect(() => {
    if (documentVisibility === 'hidden') {
      sendJsonMessage({ event: "unsubscribe", feed: "book_ui_1", product_ids: ["PI_XBTUSD"] })
    }
  }, [sendJsonMessage, documentVisibility])

  // set the snapshot
  useEffect(() => {
    if (lastJsonMessage?.feed === 'book_ui_1_snapshot') {
      orders.current = { bids: lastJsonMessage.bids, asks: lastJsonMessage.asks }
    }

    // update values against snapshot
    if (lastJsonMessage?.feed === 'book_ui_1') {
      if (lastJsonMessage.bids?.length || lastJsonMessage.asks?.length) {
        orders.current.bids = lastJsonMessage?.bids
          .reduce(deltaReducer, orders.current?.bids)
          .sort(ascSortOrder)
        orders.current.asks = lastJsonMessage?.asks
          .reduce(deltaReducer, orders.current?.asks)
          .sort(descSortOrder)
      }
    }
  }, [ascSortOrder, descSortOrder, lastJsonMessage])

  return orders
}
