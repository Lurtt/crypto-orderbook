import React from 'react';
import { useImmerReducer } from 'use-immer';

import { EVENT_SUBSCRIBE, EVENT_UNSUBSCRIBE, FEED_BOOK_UI, PI_XBTUSD, PI_ETHUSD } from 'app-constants';
import { reduceDeltaIndicators } from './service/reduceDeltaIndicators';
import { getTotalMaxValue } from './service/getTotalMaxValue';
import { ascIndicators, descIndicators } from './service/sortIndicators';
import { calculateTotals } from './service/calculateTotals';

type SendJsonMessage = (jsonMessage: any, keep?: boolean) => void

type Action =
  | { type: 'SUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'UNSUBSCRIBE'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'PAUSE' }
  | { type: 'CONTINUE' }
  | { type: 'TOGGLE_MARKETS'; payload: { sendJsonMessage: SendJsonMessage } }
  | { type: 'CREATE_SNAPSHOT'; playload: IndicatorState }
  | { type: 'UPDATE_SNAPSHOT'; payload: { data: IndicatorState, maxRecords: number } }
  | { type: 'SLICE_SNAPSHOT'; payload: { maxRecords: number } }

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
    case 'PAUSE':
      draft.isPaused = true;
      break;
    case 'CONTINUE':
      draft.isPaused = false;
      break;
    case 'TOGGLE_MARKETS':
      action.payload.sendJsonMessage({ event: EVENT_UNSUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids });
      draft.product_ids = PI_XBTUSD === draft.product_ids[0] ? [PI_ETHUSD] : [PI_XBTUSD];
      action.payload.sendJsonMessage({ event: EVENT_SUBSCRIBE, feed: FEED_BOOK_UI, product_ids: draft.product_ids });
      draft.isPaused = false;
      break;
    case 'CREATE_SNAPSHOT':
      draft.bids = action.playload.bids;
      draft.asks = action.playload.asks;
      break;
    case 'UPDATE_SNAPSHOT':
      draft.bids = action.payload.data.bids
        .sort(descIndicators)
        .reduce(reduceDeltaIndicators, draft.bids)
        .slice(0, action.payload.maxRecords);

      draft.asks = action.payload.data.asks
        .sort(ascIndicators)
        .reduce(reduceDeltaIndicators, draft.asks)
        .slice(0, action.payload.maxRecords);

      draft.bids = calculateTotals(draft.bids);
      draft.asks = calculateTotals(draft.asks);

      draft.maxTotal = getTotalMaxValue(draft);
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
    isPaused: false,
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
