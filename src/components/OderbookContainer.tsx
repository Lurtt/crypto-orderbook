import { FC } from 'react';

interface Props {
  className: string;
}

export const OderbookContainer: FC<Props> = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);
