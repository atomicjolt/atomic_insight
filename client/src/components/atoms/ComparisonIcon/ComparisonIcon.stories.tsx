import React from 'react';
import { Story } from '@storybook/react';

import { ComparisonIcon } from './ComparisonIcon';

export default {
  title: 'Atoms/ComparisonIcon',
  component: ComparisonIcon,
};

const Template = (args) => {
  return <ComparisonIcon {...args} />;
};

export const Increase: Story = Template.bind({});
Increase.args = {
  value: 1.5,
};

export const Decrease: Story = Template.bind({});
Decrease.args = {
  value: 0.5,
};
