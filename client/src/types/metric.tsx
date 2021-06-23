import type { CountData } from './metric_data';
import { MetricKey, MetricType } from '../common/constants/metric';

export type QueryResponse = Record<string, unknown>

export interface BaseMetric {
  key: MetricKey;
  type: MetricType;
  name: string;
  title: string;
  group?: boolean;
}

export interface Metric<MetricData> extends BaseMetric{
  type: MetricType.Metric;
  resolver: (QueryResponse, Metric) => MetricData;
  fragment: string;
}

export interface MetricGroup<MetricData> extends BaseMetric {
  type: MetricType.MetricGroup;
  resolver: (QueryResponse, MetricGroup) => MetricGroupData<MetricData>;
  children: Metric<MetricData>[];
}

export interface MetricGroupData<MetricData> {
  children: Record<string, MetricData>
  total: MetricData;
}

export type UnknownMetricDataType = CountData | MetricGroupData<CountData>;
export type UnknownMetricType = Metric<UnknownMetricDataType> | MetricGroup<UnknownMetricDataType>;
