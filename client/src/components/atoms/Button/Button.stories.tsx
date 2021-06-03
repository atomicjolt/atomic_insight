import React from 'react';
import { Story } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
};

export const Primary: Story<ButtonProps> = () => (
  <Button buttonType="btn--primary">Button</Button>
);

export const Secondary: Story<ButtonProps> = () => <Button>Button</Button>;

export const Border: Story<ButtonProps> = () => (
  <Button buttonType="btn--border">Button</Button>
);

export const Icon: Story<ButtonProps> = () => (
  <Button buttonType="btn--icon btn--border btn--white">
    <i className="material-icons-outlined">more_vert</i>
  </Button>
);
