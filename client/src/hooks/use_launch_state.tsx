import { useState } from 'react';

export interface LaunchState {
  idToken: string;
}

export default (): LaunchState => {
  const [launchState] = useState<LaunchState>({});

  return launchState;
};
