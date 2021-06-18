import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Select, SelectProps } from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
};

const options = [
  {
    value: 1,
    title: 'Item 1',
    subtitle: 'Description',
  },
  {
    value: 2,
    title: 'Item 2',
    subtitle: 'Description',
  },
  {
    value: 3,
    title: 'Item 3',
    subtitle: 'Description',
  },
];

export const Default: Story<SelectProps<number>> = () => {
  const [value, setValue] = useState(1);

  return (
    <Select
      selectedValue={value}
      onChange={setValue}
      options={options}
    />
  );
};

export const Searchable: Story<SelectProps<number>> = () => {
  const [value, setValue] = useState(1);

  return (
    <Select
      selectedValue={value}
      onChange={setValue}
      options={options}
      searchable={true}
    />
  );
};
