import React from 'react';
import { Story } from '@storybook/react';

import { MainPage } from './Mainpage';

export default {
  title: 'MainPage',
  component: MainPage,
};

export const Default: Story = () =>
  <MainPage title="Course Diagnostics" />;
