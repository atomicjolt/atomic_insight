import React from 'react';
import { Story } from '@storybook/react';

import { Panel } from './Panel';
import { Card } from '../../molecules/Card/Card';

export default {
  title: 'Organisms/Panel',
  component: Panel,
};

const layout = [
  { i: '1', x: 0, y: 0, w: 1, h: 2 },
  { i: '2', x: 1, y: 0, w: 1, h: 2 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 2, y: 1, w: 1, h: 1 },
];

export const Default: Story = () => (
  <Panel title="Default" layout={layout}>
    <div key={1}>
      <Card title="Card 1" />
    </div>
    <div key={2}>
      <Card title="Card 2" />
    </div>
    <div key={3}>
      <Card title="Card 3" />
    </div>
    <div key={4}>
      <Card title="Card 4" />
    </div>
  </Panel>
);
