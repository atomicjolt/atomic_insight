import React from 'react';

import {
  ComparisonSummary,
  ComparisonDisplayType,
} from '../../atoms/ComparisonSummary/ComparisonSummary';

import './IconVisual.scss';

export interface IconVisualCSS extends React.CSSProperties {
  '--scale': number;
}

const defaultData = {
  value: 0,
  comparisonValue: 1,
};
const defaultFeedback = {
  icon: 'assignment_turned_in',
  message: 'Feedback',
};

export enum IconSize {
  Normal = 'normal',
  Half = 'half',
}

export enum IconDisplayType {
  Value = 'value',
  Comparison = 'comparison',
}

export interface IconVisualProps {
  size?: IconSize;
  display?: IconDisplayType;
  data?: {
    value: number;
    comparisonValue: number;
    unit?: string;
  };
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
  display = IconDisplayType.Value,
  size = IconSize.Normal,
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
  const comparisonDisplay: ComparisonDisplayType = {
    normal: ComparisonDisplayType.Inline,
    half: ComparisonDisplayType.Stacked,
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
