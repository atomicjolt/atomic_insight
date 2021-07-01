import React from 'react';

import type { UnknownMetricType, MetricGroupData, } from '../../../types/metric';
import type { CountData } from '../../../types/metric_data';
import useMetric from '../../../hooks/use_metric';
import { MetricType } from '../../../common/constants/metric';
import { CardDisplay, CardSize } from '../../../common/constants/card';
import { VisualKey } from '../../../common/constants/visual';

import { IconVisual } from '../../visuals/IconVisual/IconVisual';
import { TableVisual } from '../../visuals/TableVisual/TableVisual';

export interface VisualProps {
  visualKey: VisualKey;
  metric?: UnknownMetricType;
  display?: CardDisplay;
  size?: CardSize,
}

export const Visual: React.FC<VisualProps> = ({ visualKey, metric, ...rest }: VisualProps) => {
  let { data } = useMetric(metric);

  switch (metric?.type) {
    case MetricType.Metric:
      data = data as CountData;
      switch (visualKey) {
        case VisualKey.Icon:
          return <IconVisual {...rest} data={data} feedback={metric.feedback} />;
        default: throw Error('Invalid metric/visual');
      }
    case MetricType.MetricGroup:
      data = data as MetricGroupData<CountData>;
      switch (visualKey) {
        case VisualKey.Icon: {
          return <IconVisual {...rest} data={data.total} feedback={metric.feedback}  />;
        }
        case VisualKey.Table: {
          return <TableVisual {...rest} data={data} metadata={metric.children} />;
        }
        default: throw Error('Invalid metric/visual');
      }
    default: throw Error('Invalid metric type');
  }
};
