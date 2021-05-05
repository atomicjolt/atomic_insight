import React from 'react';
import { Story } from '@storybook/react';

import { GridContainer } from './GridContainer';

export default {
  title: 'Organisms/Grid',
  component: GridContainer,
};

export const Default: Story = () =>
  <GridContainer title="Default">
    <div key={1} data-grid={{ x: 0, y: 0, w: 1, h: 1 }} />
    <div key={2} data-grid={{ x: 1, y: 0, w: 1, h: 1 }} />
    <div key={3} data-grid={{ x: 2, y: 0, w: 1, h: 1 }} />
    <div key={4} data-grid={{ x: 0, y: 1, w: 1, h: 0.5 }} />
  </GridContainer>;
