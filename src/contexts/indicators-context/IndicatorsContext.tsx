import React from 'react';
import { useImmerReducer } from "use-immer";

import { EVENT_SUBSCRIBE, EVENT_UNSUBSCRIBE, FEED_BOOK_UI, PI_XBTUSD } from 'app-constants';
import { reduceDeltaIndicators } from './service/reduceDeltaIndicators';
import { getTotalMaxValue } from './service/getTotalMaxValue';
import { ascIndicators, descIndicators } from './service/sortIndicators';
import { calculateTotals } from './service/calculateTotals';

type SendJsonMessage = (jsonMessage: any, keep?: boolean) => void

type Action =
  | { type: 'SUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'UNSUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'CREATE_SNAPSHOT'; playload: IndicatorState }
  | { type: 'UPDATE_SNAPSHOT'; payload: IndicatorState }
  | { type: 'SLICE_SNAPSHOT'; payload: { maxRecords: number } }
  | { type: 'UPDATE_PRODUCT_IDS'; payload: { product_ids: [string] } }

type Dispatch = (action: Action) => void

type IndicatorsProviderProps = { children: React.ReactNode };

const IndicatorsContext = React.createContext<{ dispatch: Dispatch; state: IndicatorState } | undefined>(
  undefined,
);

const indicatorsReducer = (draft: IndicatorState, action: Action) => {
  switch (action.type) {
    case 'SUBSCRIBE':
      action.payload.sendJsonMessage({ event: EVENT_SUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids });
      break;
    case 'UNSUBSCRIBE':
      action.payload.sendJsonMessage({ event: EVENT_UNSUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids });
      break;
    case 'CREATE_SNAPSHOT':
      draft.bids = action.playload.bids;
      draft.asks = action.playload.asks;
      break;
    case 'UPDATE_SNAPSHOT':
      draft.bids = action.payload.bids
        .sort(descIndicators)
        .reduce(reduceDeltaIndicators, draft.bids);

      draft.asks = action.payload.asks
        .sort(ascIndicators)
        .reduce(reduceDeltaIndicators, draft.asks);

      draft.bids = calculateTotals(draft.bids);
      draft.asks = calculateTotals(draft.asks);

      draft.maxTotal = getTotalMaxValue(draft);
      break;
    case 'SLICE_SNAPSHOT':
      draft.bids = draft.bids.slice(0, action.payload.maxRecords);
      draft.asks = draft.asks.slice(0, action.payload.maxRecords);
      break;
    case 'UPDATE_PRODUCT_IDS':
      draft.product_ids = action.payload.product_ids;
      break;
    default:
      throw new Error('Unhandled action type');
  }
};

export const IndicatorsProvider = ({ children }: IndicatorsProviderProps) => {
  const [ state, dispatch ] = useImmerReducer<IndicatorState, Action>(indicatorsReducer, {
    bids: [],
    asks: [],
    product_ids: [PI_XBTUSD],
    maxTotal: 0,
  });
  const value = { state, dispatch };

  return <IndicatorsContext.Provider value={value}>{children}</IndicatorsContext.Provider>;
};

export const useIndicators = () => {
  const context = React.useContext(IndicatorsContext);

  if (context === undefined) {
    throw new Error('useIndicators must be used within a IndicatorsProvider');
  }

  return context;
};
