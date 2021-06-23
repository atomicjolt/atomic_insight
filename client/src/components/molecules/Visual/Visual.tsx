import React from 'react';

import type { UnknownMetricType } from '../../../types/metric';
import useMetric from '../../../hooks/use_metric';
import { IconVisual } from '../../visuals/IconVisual/IconVisual';
import { CardDisplay, CardSize } from '../../../common/constants/card';
import { VisualKey } from '../../../common/constants/visual';

export interface VisualProps {
  visualKey?: VisualKey;
  display?: CardDisplay;
  size?: CardSize,
  metric?: UnknownMetricType;
}

export const Visual: React.FC<VisualProps> = ({ visualKey, metric, ...rest }: VisualProps) => {
  const { data } = useMetric(metric);

  const invalidVisual = <IconVisual {...rest} />;

  if (data) {
    // Type guard for MetricGroupData
    if ('total' in data) {
      switch(visualKey) {
        case VisualKey.Icon: return <IconVisual data={data.total} {...rest} />;
        default: return invalidVisual;
      }
    } else {
      switch(visualKey) {
        case VisualKey.Icon: return <IconVisual data={data} {...rest} />;
        default: return invalidVisual;
      }
    }
  }
  return invalidVisual;
};
