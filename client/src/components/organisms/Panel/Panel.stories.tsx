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

const cards = [{
  key: 1,
  element: <Card title="Card 1" />
}, {
  key: 2,
  element: <Card title="Card 2" />
}, {
  key: 3,
  element: <Card title="Card 3" />
}, {
  key: 4,
  element: <Card title="Card 4" />
}];

export const Default: Story = () => (
  <Panel title="Default" layout={layout} items={cards} />
);
