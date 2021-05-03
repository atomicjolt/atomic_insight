import React from 'react';
import './Button.scss';

export interface ButtonProps extends React.PropsWithChildren<any> {
  onClick?: () => void;
  className?: string
}

export const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
