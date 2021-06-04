import React from 'react';
import { Story } from '@storybook/react';

import { Panel } from './Panel';

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
  title: 'Card 1',
  element: <div />
}, {
  key: 2,
  title: 'Card 2',
  element: <div />
}, {
  key: 3,
  title: 'Card 3',
  element: <div />
}, {
  key: 4,
  title: 'Card 4',
  element: <div />
}];

export const Default: Story = () => (
  <Panel title="Default" layout={layout} cards={cards} />
);
