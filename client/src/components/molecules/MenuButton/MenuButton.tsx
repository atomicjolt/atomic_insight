import React from 'react';

import './MenuButton.scss';

export const MenuButton: React.FC = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => {
  return <div className="menu-btn">{children}</div>;
};
