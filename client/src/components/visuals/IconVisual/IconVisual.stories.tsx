import React from 'react';
import { Story } from '@storybook/react';

import { IconVisual } from './IconVisual';

export default {
  title: 'Visuals/IconVisual',
  component: IconVisual,
};

const mockData = {
  data: {
    value: 40,
    comparisonValue: 1.08,
    unit: 'min',
  },
  feedback: [
    {
      icon: 'assignment_turned_in',
      message: 'Positive feedback',
      range: [1, null],
    },
    {
      icon: 'assignment_late',
      message: 'Negative feedback',
    },
  ],
};

const Template = (args) => {
  return (
    <div className={`mock-card-container size--${args?.size ?? 'normal'}`}>
      <IconVisual {...args} />
    </div>
  );
};

export const Value: Story = Template.bind({});
Value.args = {
  ...mockData,
  display: 'value',
};

export const ValueHalf: Story = Template.bind({});
ValueHalf.args = {
  ...mockData,
  display: 'value',
  size: 'half',
};

export const Comparison: Story = Template.bind({});
Comparison.args = {
  ...mockData,
  display: 'comparison',
};

export const ComparisonHalf: Story = Template.bind({});
ComparisonHalf.args = {
  ...mockData,
  display: 'comparison',
  size: 'half',
};
