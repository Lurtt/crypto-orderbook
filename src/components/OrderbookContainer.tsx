import { FC } from 'react';

interface Props {
  className: string;
}

export const OrderbookContainer: FC<Props> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);
