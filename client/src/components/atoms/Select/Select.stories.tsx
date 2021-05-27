import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Select, SelectProps } from './Select';

export default {
  title: 'Atoms/Select',
  component: Select,
};

const options = [
  {
    key: 1,
    title: 'Item 1',
    subtitle: 'Description',
  },
  {
    key: 2,
    title: 'Item 2',
    subtitle: 'Description',
  },
  {
    key: 3,
    title: 'Item 3',
    subtitle: 'Description',
  },
];

export const Default: Story<SelectProps> = () => {
  const [selectedKey, setSelectedKey] = useState(1);

  return (
    <Select
      selectedKey={selectedKey}
      onChange={setSelectedKey}
      options={options}
    />
  );
};
