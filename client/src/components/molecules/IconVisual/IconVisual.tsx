import React from 'react';

import { ComparisonSummary } from '../../atoms/ComparisonSummary/ComparisonSummary';
import './IconVisual.scss';

export interface IconVisualCSS extends React.CSSProperties {
  '--scale': number;
}

export interface IconVisualProps {
  size?: 'normal' | 'half';
  display: 'value' | 'comparison';
  data: {
    value: number;
    comparisonValue: number;
    unit?: string;
  };
  feedback:
    | {
        icon: string;
        message: string;
        dataKey?: string;
        range?: [number | null, number | null];
      }[]
    | {
        icon: string;
        message: string;
      };
}

export const IconVisual = ({
  display,
  size = 'normal',
  data,
  feedback,
}: IconVisualProps) => {
  function getFeedback() {
    if (Array.isArray(feedback)) {
      return feedback.find(({ dataKey = 'comparisonValue', range = [] }) => {
        const [min, max] = range;
        const value = data[dataKey];
        return (min ? min <= value : true) && (max ? max >= value : true);
      });
    }
    return feedback;
  }

  const { icon, message } = getFeedback() || {};
  const comparisonDisplay = {
    normal: 'inline',
    half: 'stacked',
  }[size];

  return (
    <div className={`icon-visual display--${display} size--${size}`}>
      <div className="icon-visual__feedback">
        <p>{message}</p>
      </div>
      <div className="icon-visual__data">
        <div className="icon-visual__value-container">
          <div className="icon-visual__icon">
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <div className="icon-visual__value">
            <h4>In last week</h4>
            <h1>
              {data.value}
              {data.unit}
            </h1>
          </div>
        </div>
        <ComparisonSummary
          value={data.comparisonValue}
          display={comparisonDisplay}
        />
      </div>
    </div>
  );
};
