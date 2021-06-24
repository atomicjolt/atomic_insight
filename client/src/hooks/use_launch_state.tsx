import { useState } from 'react';
import jwtDecode from 'jwt-decode';

export interface LaunchState {
  contextId: string;
}

interface Wrapped {
  Token: LaunchState;
}

const RAW_PAYLOAD: Wrapped = jwtDecode(window.LAUNCH_TOKEN);
const LAUNCH_STATE: LaunchState = RAW_PAYLOAD.Token;

export default (): LaunchState => {
  const [launchState] = useState<LaunchState>(LAUNCH_STATE);

  return launchState;
};
