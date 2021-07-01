import React from 'react';

import './ComparisonSummary.scss';

export enum ComparisonDisplay {
  Inline = 'inline',
  Stacked = 'stacked',
  Short = 'short',
  Icon = 'icon',
}

export interface ComparisonSummaryProps {
  value: number;
  display?: ComparisonDisplay;
}

export const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({
  value,
  display = ComparisonDisplay.Inline,
}: ComparisonSummaryProps) => {
  const percent = Math.floor(value * 100);
  const percentSign = Math.sign(percent);
  const absPercentage = Math.abs(percent);

  const iconClass = {
    '1': 'increase',
    '0': '',
    '-1': 'decrease',
  }[String(percentSign)];

  return (
    <div className={`comparison-summary display--${display}`}>
      {percentSign ? (
        <div>
          <p className="comparison-summary__short-value">
            <i
              className={`material-icons-round comparison-summary__icon ${iconClass}`}
            >
              play_arrow
            </i>
            <b className="comparison-summary__value">
              {absPercentage}%&nbsp;&nbsp;
            </b>
          </p>
          <p className="comparison-summary__label">
            {percentSign === 1 ? 'above' : 'below'}
            &nbsp;course avg.
          </p>
        </div>
      ) : (
        <div>
          <p className="comparison-summary__label">
            <b>Equal&nbsp;</b>
          </p>
          <p className="comparison-summary__label">to course avg.</p>
        </div>
      )}
    </div>
  );
};
