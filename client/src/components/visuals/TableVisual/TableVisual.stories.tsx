import React from 'react';
import { Story } from '@storybook/react';

import { TableVisual } from './TableVisual';

export default {
  title: 'Visuals/TableVisual',
  component: TableVisual,
};

const mockData = {
  data: {
    children: [
      {
        key: 1,
        data: {
          value: 4,
          comparisonValue: 0.08,
        }
      },
      {
        key: 2,
        data: {
          value: 7,
          comparisonValue: 0.03,
        }
      },
      {
        key: 3,
        data: {
          value: 2,
          comparisonValue: -0.02,
        }
      },
      {
        key: 4,
        data: {
          value: 5,
          comparisonValue: 0.04,
        }
      }
    ],
    total: {
      value: 18,
      comparisonValue: 0.13,
    },
  },
  metadata: [
    { key: 1, title: 'Item 1' },
    { key: 2, title: 'Item 2' },
    { key: 3, title: 'Item 3' },
    { key: 4, title: 'Item 4' },
  ],
};

const Template = (args) => {
  return (
    <div className={`mock-card-container size--${args?.size ?? 'normal'}`}>
      <TableVisual {...args} />
    </div>
  );
};

export const Value: Story = Template.bind({});
Value.args = {
  ...mockData,
  display: 'value',
};

export const Comparison: Story = Template.bind({});
Comparison.args = {
  ...mockData,
  display: 'comparison',
};
