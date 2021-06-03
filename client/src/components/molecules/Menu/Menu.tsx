import React from 'react';

import './Menu.scss';

export type MenuProps = React.PropsWithChildren<{
  isOpen: boolean;
  menuType?: string;
}>

export const Menu: React.FC<MenuProps> = ({
  menuType = '',
  isOpen,
  children,
}: MenuProps) => {
  return (
    <ul className={`menu ${isOpen ? 'is-open' : ''} ${menuType}`}>
      {children}
    </ul>
  );
};
