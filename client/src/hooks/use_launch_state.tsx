import { useState } from 'react';

export interface LaunchState { }

export default (): [LaunchState] => {
  const [launchState] = useState<LaunchState>(window.LAUNCH_STATE);

  return launchState;
};
