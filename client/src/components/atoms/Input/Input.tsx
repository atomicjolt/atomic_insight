import React from 'react';
import './Input.scss';

import { Label } from '../Label/Label';

export interface InputProps {
  label?: string;
  value?: string;
  onChange?: (string) => void;
  gridAreaStyle?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange = () => {},
  label,
  gridAreaStyle,
}: InputProps) => {
  let elem = (
    <input
      aria-label={label}
      tabIndex={0}
      className="input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  if (label !== '') {
    elem = <Label title={label}>{elem}</Label>;
  }

  if (gridAreaStyle !== '') {
    elem = <div style={{ gridArea: gridAreaStyle }}>{elem}</div>;
  }

  return elem;
};
