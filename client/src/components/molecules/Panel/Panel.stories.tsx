import React from 'react';
import { Story } from '@storybook/react';

import { Panel } from './Panel';

export default {
  title: 'Molecules/Panel',
  component: Panel,
};

export const Default: Story = () =>
  <Panel title="Default">
    Content
  </Panel>;
