import { LaunchState } from './use_launch_state';

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    LAUNCH_STATE: LaunchState;
  }
}
