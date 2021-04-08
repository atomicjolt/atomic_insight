import React from 'react';
import { Story } from '@storybook/react';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn: Story<HeaderProps> = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut: Story<HeaderProps> = Template.bind({});
LoggedOut.args = {};
