import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

export const renderWithCreateRoot = (ui: ReactElement) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(ui);

  return { container, root };
};
