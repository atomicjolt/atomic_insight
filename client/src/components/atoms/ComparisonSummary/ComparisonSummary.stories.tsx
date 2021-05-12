import React from 'react';
import { Story } from '@storybook/react';

import { ComparisonSummary } from './ComparisonSummary';

export default {
  title: 'Atoms/ComparisonSummary',
  component: ComparisonSummary,
};

const mockData = {
  value: 1.1,
};

const Template = (args) => {
  return <ComparisonSummary {...args} />;
};

export const Inline: Story = Template.bind({});
Inline.args = {
  ...mockData,
};

export const Stacked: Story = Template.bind({});
Stacked.args = {
  ...mockData,
  display: 'stacked',
};

export const Short: Story = Template.bind({});
Short.args = {
  ...mockData,
  display: 'short',
};

export const Icon: Story = Template.bind({});
Icon.args = {
  ...mockData,
  display: 'icon',
};
