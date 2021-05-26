import React from 'react';

import './MenuButton.scss';

export const MenuButton = ({ children } : React.PropsWithChildren) => {
  return <div className="menu-btn">{children}</div>;
};
