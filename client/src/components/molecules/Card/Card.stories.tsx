import React from 'react';
import { Story } from '@storybook/react';

import { Card, CardProps } from './Card';

export default {
  title: 'Molecules/Card',
  component: Card,
};

const mockData = {
  key: 1,
  title: 'Card',
};

export const Default: Story<CardProps> = () => {
  return (
    <div style={{ width: '300px', height: '240px' }}>
      <Card data={mockData} />
    </div>
  );
};
