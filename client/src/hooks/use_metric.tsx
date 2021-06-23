import { useState, useEffect } from 'react';
import { useApolloClient, ApolloError } from '@apollo/client';

import type { UnknownMetricType, UnknownMetricDataType } from '../types/metric';
import { MetricType } from '../common/constants/metric';
import { buildQueryFromMetrics } from '../common/utils/metric';

export interface UseMetricType<MetricData> {
  data?: MetricData;
  loading: boolean;
  error?: ApolloError;
}

export default function useMetric<MetricData extends UnknownMetricDataType>(
  metric?: UnknownMetricType
): UseMetricType<MetricData> {
  const [data, setData] = useState<MetricData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // Prevent apollo client error on storybook
  let client;
  try {
    client = useApolloClient();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }

  function fetchMetricData() {
    if (!metric) return;

    let queryString;
    switch(metric.type) {
      case MetricType.Metric:
        queryString = buildQueryFromMetrics([metric]);
        break;
      case MetricType.MetricGroup:
        queryString = buildQueryFromMetrics(metric.children);
        break;
      default:
        throw TypeError('Unknown metric type');
    }

    client
      ?.query({ query: queryString })
      .then((res) => {
        return metric.resolver(res.data, metric) as MetricData;
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchMetricData();
  }, [metric]);

  return { data, loading, error };
}
