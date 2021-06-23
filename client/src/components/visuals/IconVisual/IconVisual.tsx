import React from 'react';
import './IconVisual.scss';

import type { CountData } from '../../../types/metric_data';
import { ComparisonSummary, ComparisonDisplay } from '../../atoms/ComparisonSummary/ComparisonSummary';
import { CardDisplay, CardSize } from '../../../common/constants/card';


const defaultData = {
  value: 0,
  comparisonValue: 1,
};
const defaultFeedback = {
  icon: 'assignment_turned_in',
  message: '',
};

export interface IconVisualProps {
  size?: CardSize;
  display?: CardDisplay;
  data?: CountData;
  feedback?:
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

export const IconVisual: React.FC<IconVisualProps> = ({
  display = CardDisplay.Value,
  size = CardSize.Normal,
  data = defaultData,
  feedback = defaultFeedback,
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
  const comparisonDisplay: ComparisonDisplay = {
    [CardSize.Normal]: ComparisonDisplay.Inline,
    [CardSize.Half]: ComparisonDisplay.Stacked,
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
