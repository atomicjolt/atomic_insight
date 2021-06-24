import { useState } from 'react';

export interface LaunchState {}

export default (): LaunchState => {
  const [launchState] = useState<LaunchState>({} as LaunchState);

  return launchState;
};
