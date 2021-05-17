import React from 'react';
import { Story } from '@storybook/react';

import { Impact, Card, CardProps } from './Card';

export default {
  title: 'Molecules/Card',
  component: Card,
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

export const Default: Story<CardProps> = ({ pinned, impact, title }: CardProps) => {
  return (
    <div style={{ width: '500px', height: '400px' }}>
      <Card title={title} impact={impact} pinned={pinned}>Contents</Card>
    </div>
  );
};
