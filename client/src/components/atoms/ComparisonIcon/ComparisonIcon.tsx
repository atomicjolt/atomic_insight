import React from 'react';

import './ComparisonIcon.scss';

export interface ComparisonIconProps {
  value: number;
}

export const ComparisonIcon = ({ value }: ComparisonIconProps) => {
  const className = {
    '1': 'increase',
    '0': '',
    '-1': 'decrease',
  }[String(Math.sign(value - 1))];

  return <i className={`material-icons-round comparison-icon ${className}`}>play_arrow</i>;
};
