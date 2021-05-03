import React from 'react';

import './Menu.scss';

export interface MenuProps extends React.PropsWithChildren<any> {
  isOpen: boolean;
  className?: string;
}

export const Menu = ({ className, isOpen, children }: MenuProps) => {
  return (
    <ul className={`menu ${isOpen ? 'is-open' : ''} ${className}`}>
      {children}
    </ul>
  );
};
