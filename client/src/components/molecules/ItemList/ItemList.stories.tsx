import React from 'react';
import { Story } from '@storybook/react';

import { ItemList } from './ItemList';

export default {
  title: 'Molecules/ItemList',
  component: ItemList,
};

const data = [
  { key: 1, name: 'Item 1' },
  { key: 2, name: 'Item 2' },
  { key: 3, name: 'Item 3' },
  { key: 4, name: 'Item 4' },
];

function renderItem(item) {
  return (
    <div>
      <input defaultValue={item.key} />
      <div>
        <button className="draggable-handle">
          <i className="material-icons-outlined">drag_handle</i>
        </button>
      </div>
    </div>
  );
}

export const Default: Story = () => (
  <ItemList data={data} renderItem={renderItem} />
);
