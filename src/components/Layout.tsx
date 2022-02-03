import { FC } from 'react';

export const Layout: FC = ({ children }) => (
  <main className="py-6 px-2 sm:px-4 md:px-8 lg:px-16">
    {children}
  </main>
);

