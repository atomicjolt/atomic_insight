import React from 'react';
import { Story } from '@storybook/react';
import { Select, SelectProps } from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
};

export const Default: Story<SelectProps> = () =>
  <Select defaultValue="Weekly">
    <option value="weekly" title="Weekly">
      <b>Weekly</b>
      <div>Other weeks of this course</div>
    </option>
    <option value="classes" title="My Classes">
      <b>My Classes</b>
      <div>Other classes I've taught</div>
    </option>
    <option value="department" title="Department">
      <b>Department</b>
      <div>Other courses in this department</div>
    </option>
  </Select>;
