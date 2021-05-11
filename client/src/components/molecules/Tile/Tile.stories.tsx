import React from 'react';
import { Story } from '@storybook/react';

import { Impact, Tile, TileProps } from './Tile';

export default {
  title: 'Molecules/Tile',
  component: Tile,
  argTypes: {
    title: {
      defaultValue: 'Default'
    },
    impact: {
      defaultValue: Impact.Low
    },
    className: { table: { disable: true } },
    onEdit: { table: { disable: true } },
    onPin: { table: { disable: true } },
  }
};

export const Default: Story<TileProps> = ({ pinned, impact, title }: TileProps) => {
  return (
    <div style={{ width: '500px', height: '400px' }}>
      <Tile title={title} impact={impact} pinned={pinned}>Contents</Tile>
    </div>
  );
};
