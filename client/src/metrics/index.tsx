// Export of all metrics for Atomic Insight

import * as engagementMetrics from './engagement';

const metricModules = {
  ...engagementMetrics,
};

const metrics = Object.values(metricModules);

export default metrics;
