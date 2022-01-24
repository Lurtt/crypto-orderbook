import { FC } from 'react'

import { Oderbook } from 'components/Oderbook'

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Orderbook
      </header>
      <Oderbook />
    </div>
  );
}

export default App;
