import { useState } from 'react';

export interface LaunchState { }

export default () => {
  const [launchState] = useState<LaunchState>(window.LAUNCH_STATE);

  return launchState;
};
