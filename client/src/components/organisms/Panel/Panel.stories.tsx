import React from 'react';
import { Story } from '@storybook/react';

import { Panel } from './Panel';
import { CardSize } from '../../../common/constants/card';

export default {
  title: 'Organisms/Panel',
  component: Panel,
};

const cards = [{
  key: 1,
  title: 'Card 1',
  position: { x:0, y: 0 },
}, {
  key: 2,
  title: 'Card 2',
  position: { x:1, y: 0 },
}, {
  key: 3,
  title: 'Card 3',
  size: CardSize.Half,
  position: { x:2, y: 0 },
}, {
  key: 4,
  title: 'Card 4',
  size: CardSize.Half,
  position: { x:2, y: 1 },
}];

export const Default: Story = () => (
  <Panel title="Default" cards={cards} />
);
