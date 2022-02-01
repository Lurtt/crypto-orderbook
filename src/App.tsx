import { FC } from 'react';

import { Oderbook } from 'components/Oderbook';
import { useIndicators } from 'contexts/indicators-context/IndicatorsContext';

const App: FC = () => {
  const { state, dispatch } = useIndicators();

  const handleOnClick = () => dispatch({ type: 'CONTINUE' });

  return (
    <div className="App">
      <header className="App-header">
        Orderbook
      </header>
      {state.isPaused && <button onClick={handleOnClick}>CONTINUE</button>}
      <Oderbook />
    </div>
  );
};

export default App;
