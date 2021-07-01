import { DocumentNode, gql } from '@apollo/client';

import type {
  QueryResponse,
  Metric,
  MetricGroup,
  MetricGroupData,
} from '../../types/metric';

export function buildQueryFromMetrics<MetricData>(
  metrics: Metric<MetricData>[]
): DocumentNode {
  const fragments = metrics
    .map((m) => `fragment ${m.name} on Query ${m.fragment}`)
    .join('\n');
  const fragmentNames = metrics.map((m) => `...${m.name}`).join('\n');

  const queryString = gql`
    ${fragments}

    query Metric {
      ${fragmentNames}
    }
  `;
  return queryString;
}

export function resolveMetricGroupData<MetricData>(
  data: QueryResponse,
  metric: MetricGroup<MetricData>
): MetricGroupData<MetricData>['children'] {
  return metric.children.map((m) => ({
    key: m.key,
    data: m.resolver(data, m),
  })) as MetricGroupData<MetricData>['children'];
}

export function totalMetricGroupData<MetricData>(
  groupData: MetricGroupData<MetricData>['children']
): MetricGroupData<MetricData>['total'] {
  const totalReducer = (total, currentData) => {
    return Object.fromEntries(
      Object.entries(total).map(([key, value]) => {
        if (typeof value === 'number') {
          return [key, value + currentData[key]];
        }
        return [key, value];
      })
    ) as MetricGroupData<MetricData>['total'];
  };
  return groupData.map(({ data }) => data).reduce(totalReducer);
}

export function metricGroupResolver<MetricData>(
  data: QueryResponse,
  metric: MetricGroup<MetricData>
): MetricGroupData<MetricData> {
  const children = resolveMetricGroupData(data, metric);
  const total = totalMetricGroupData(children);

  return {
    children,
    total,
  };
}
