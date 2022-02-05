import { renderHook, act } from '@testing-library/react-hooks';

import { useIndicators, IndicatorsProvider } from '../IndicatorsContext';

describe('useIndicators', () => {
  it('inits default state', () => {
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    expect(result.current.state).toEqual({
      asks: [],
      bids: [],
      isPaused: false,
      maxTotal: 0,
      product_ids: ['PI_XBTUSD'],
    });
  });

  it('dispatch SUBSCRIBE action', () => {
    const sendJsonMessage = jest.fn();
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    result.current.dispatch({ type: 'SUBSCRIBE', payload: { sendJsonMessage } });

    expect(sendJsonMessage).toHaveBeenCalledTimes(1);
  });

  it('dispatch UNSUBSCRIBE action', () => {
    const sendJsonMessage = jest.fn();
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    result.current.dispatch({ type: 'UNSUBSCRIBE', payload: { sendJsonMessage } });

    expect(sendJsonMessage).toHaveBeenCalledTimes(1);
  });

  it('dispatch PAUSE and CONTINUE actions', () => {
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    act(() => {
      result.current.dispatch({ type: 'PAUSE' });
    });

    expect(result.current.state.isPaused).toEqual(true);

    act(() => {
      result.current.dispatch({ type: 'CONTINUE' });
    });

    expect(result.current.state.isPaused).toEqual(false);
  });

  it('dispatch TOGGLE_MARKETS action', () => {
    const sendJsonMessage = jest.fn();
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    act(() => {
      result.current.dispatch({ type: 'TOGGLE_MARKETS', payload: { sendJsonMessage } });
    });

    expect(sendJsonMessage).toBeCalledTimes(2);
    expect(result.current.state.product_ids).toEqual(['PI_ETHUSD']);
    expect(result.current.state.isPaused).toEqual(false);
  });

  it('dispatch CREATE_SNAPSHOT action', () => {
    const payload = { bids: [[ 1, 2 ]], asks: [[ 4, 5 ]] } as any;
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    act(() => {
      result.current.dispatch({ type: 'CREATE_SNAPSHOT', payload });
    });


    expect(result.current.state.bids).toEqual([[ 1, 2 ]]);
    expect(result.current.state.asks).toEqual([[ 4, 5 ]]);
  });

  it('dispatch UPDATE_SNAPSHOT action', () => {
    const data = { bids: [ [ 1, 2 ], [ 4, 2 ], [ 1, 7 ] ], asks: [ [ 4, 5 ], [ 1, 5 ], [ 1, 0 ], [ 7, 1 ] ] } as any;
    const { result } = renderHook(() => useIndicators(), { wrapper: IndicatorsProvider });

    act(() => {
      result.current.dispatch({ type: 'UPDATE_SNAPSHOT', payload: { data, maxRecords: 10 } });
    });


    expect(result.current.state.bids).toEqual([ [ 4, 2, 2 ], [ 1, 7, 9 ] ]);
    expect(result.current.state.asks).toEqual([ [ 4, 5, 5 ], [ 7, 1, 6 ] ]);
    expect(result.current.state.maxTotal).toEqual(9);
  });
});
