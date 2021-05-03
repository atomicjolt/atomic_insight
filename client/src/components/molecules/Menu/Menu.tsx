import React from 'react';

import './Menu.scss';

export interface MenuProps extends React.PropsWithChildren<any> {
  className: string;
  isOpen: boolean;
}

export const Menu = ({ className, isOpen, children }: MenuProps) => {
  return (
    <ul className={`menu ${isOpen ? 'is-open' : ''} ${className}`}>
      {children}
    </ul>
  );
};
