import React from 'react';
import { Story } from '@storybook/react';
import { Input, InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Default: Story<InputProps> = () => <Input />;
