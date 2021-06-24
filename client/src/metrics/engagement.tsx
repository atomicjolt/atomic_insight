import type { Metric, MetricGroup } from '../types/metric';
import type { CountData } from '../types/metric_data';
import { MetricKey, MetricType } from '../common/constants/metric';
import { metricGroupResolver } from '../common/utils/metric';

export const DiscussionPosts: Metric<CountData> = {
  key: MetricKey.DiscussionPosts,
  type: MetricType.Metric,
  name: 'DiscussionPosts',
  title: 'Discussion Posts',
  fragment: `{
    discussionEntryCreatedEvents {
      count
    }
  }`,
  resolver(data) {
    const { discussionEntryCreatedEvents: { count } } = data;
    return {
      value: count,
      comparisonValue: 1.12, // TODO: This value should be count / avg
    };
  },
};

export const ActiveParticipations: MetricGroup<CountData> = {
  key: MetricKey.ActiveParticipations,
  type: MetricType.MetricGroup,
  name: 'ActiveParticipations',
  title: 'Active Participations',
  children: [DiscussionPosts],
  resolver: metricGroupResolver,
};
