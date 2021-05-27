import React from 'react';
import { Story } from '@storybook/react';

import { MainPage } from './MainPage';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
};

export const Default: Story = () =>
  <MainPage title="Course Diagnostics" />;
