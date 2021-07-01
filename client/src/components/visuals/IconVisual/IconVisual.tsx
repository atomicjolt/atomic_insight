import React from 'react';
import './IconVisual.scss';

import type { CountData } from '../../../types/metric_data';
import type { Feedback } from '../../../types/feedback';
import { ComparisonSummary, ComparisonDisplay } from '../../atoms/ComparisonSummary/ComparisonSummary';
import { CardDisplay, CardSize } from '../../../common/constants/card';

export interface IconVisualProps {
  size?: CardSize;
  display?: CardDisplay;
  data?: CountData;
  feedback?: Feedback;
}

export const IconVisual: React.FC<IconVisualProps> = ({
  display = CardDisplay.Value,
  size = CardSize.Normal,
  data,
  feedback,
}: IconVisualProps) => {
  function getFeedback() {
    if (Array.isArray(feedback)) {
      return feedback.find(({ dataKey = 'comparisonValue', range = [null, null] }) => {
        const [min, max] = range;
        const value = data?.[dataKey];
        return (min !== null ? min <= value : true) && (max !== null ? max >= value : true);
      });
    }
    return feedback;
  }

  const { icon, message } = getFeedback() || {};
  const comparisonDisplay: ComparisonDisplay = {
    [CardSize.Normal]: ComparisonDisplay.Inline,
    [CardSize.Half]: ComparisonDisplay.Stacked,
  }[size];

  if (data === undefined) {
    return <div />;
  }

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
            <p>In last week</p>
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
