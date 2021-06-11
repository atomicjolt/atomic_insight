import React from 'react';
import './Label.scss';

export enum LabelDisplay {
  None = 'none',
  Inline = 'inline',
  Stacked = 'stacked',
}

export type LabelProps = React.PropsWithChildren<{
  title?: string;
  display?: LabelDisplay;
}>;

export const Label: React.FC<LabelProps> = ({
  title,
  display = LabelDisplay.Stacked,
  children,
}: LabelProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={`label display--${display}`}>
      <p>{title}</p>
      <div>
        {children}
      </div>
    </label>
  );
};
