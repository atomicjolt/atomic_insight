import React from 'react';
import './Button.scss';

export type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void;
  buttonType?: string
}>

export const Button: React.FC<ButtonProps> = ({
  onClick,
  buttonType,
  children,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`btn ${buttonType}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
