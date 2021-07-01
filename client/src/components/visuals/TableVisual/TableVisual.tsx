import React from 'react';
import './TableVisual.scss';

import type { MetricGroupData } from '../../../types/metric';
import type { CountData } from '../../../types/metric_data';
import {
  ComparisonSummary,
  ComparisonDisplay,
} from '../../atoms/ComparisonSummary/ComparisonSummary';
import { CardDisplay, CardSize } from '../../../common/constants/card';
import { MetricKey } from '../../../common/constants/metric';

export type TableVisualMetadata = {
  key: MetricKey;
  title?: string;
}[];

export interface TableVisualProps {
  size?: CardSize;
  display?: CardDisplay;
  data?: MetricGroupData<CountData>;
  metadata?: TableVisualMetadata;
}

export const TableVisual: React.FC<TableVisualProps> = ({
  display = CardDisplay.Value,
  size = CardSize.Normal,
  data,
  metadata,
}: TableVisualProps) => {

  const rows = data?.children?.map(({ key, data: childData }) => {
    const { value, comparisonValue } = childData;
    const { title } = metadata?.find((m) => m.key === key) ?? {};
    return { key, title, value, comparisonValue };
  }) ?? [];

  if (data === undefined) {
    return <div />;
  }

  return (
    <div className={`table-visual display--${display} size--${size}`}>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="comparison-cell">Course Avg.</th>
              <th>Count</th>
            </tr>
          </thead>
          {data !== undefined ? (
            <tbody>
              <tr className="total">
                <td>Total</td>
                <td className="comparison-cell">
                  <ComparisonSummary
                    value={data.total.comparisonValue}
                    display={ComparisonDisplay.Short}
                  />
                </td>
                <td>{data.total.value}</td>
              </tr>
              {rows.map(({ key, title, value, comparisonValue }) => {
                return (
                  <tr key={key}>
                    <td>{title}</td>
                    <td className="comparison-cell">
                      <ComparisonSummary
                        value={comparisonValue}
                        display={ComparisonDisplay.Short}
                      />
                    </td>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
};
