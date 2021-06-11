import React from 'react';
import { Layout } from 'react-grid-layout';
import { Story } from '@storybook/react';

import { Grid } from './Grid';
import { Card } from '../Card/Card';

export default {
  title: 'Molecules/Grid',
  component: Grid,
};

const layout: Layout[] = [
  { i: '1', x: 0, y: 0, w: 1, h: 2 },
  { i: '2', x: 1, y: 0, w: 1, h: 2 },
  { i: '3', x: 2, y: 0, w: 1, h: 1 },
  { i: '4', x: 2, y: 1, w: 1, h: 1 },
];

export const Default: Story = () => (
  <Grid layout={layout}>
    <div key={1} className="mock-grid-item" />
    <div key={2} className="mock-grid-item" />
    <div key={3} className="mock-grid-item" />
    <div key={4} className="mock-grid-item" />
  </Grid>
);
