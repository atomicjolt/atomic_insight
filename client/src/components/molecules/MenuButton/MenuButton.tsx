import React from 'react';

import './MenuButton.scss';

export interface MenuButtonProps extends React.PropsWithChildren<any> {}

export const MenuButton = ({ children } : MenuButtonProps) => {
  return <div className="menu-btn">{children}</div>;
};
