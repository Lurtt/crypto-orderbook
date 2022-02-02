import { FC } from 'react';

export const OderbookContainer: FC = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2">
    <h2>Order book</h2>
    {children}
  </div>
);

