import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import './ItemList.scss';

const GridLayout = WidthProvider(Responsive);

interface WithKey {
  key: number | string;
}

export type ItemListProps<DataType> = React.PropsWithChildren<{
  data: DataType[];
  renderItem: (item: DataType, index: number) => React.ReactElement;
}>

const ItemList = <DataType extends WithKey>({
  data,
  renderItem,
}: ItemListProps<DataType>): React.ReactElement<ItemListProps<DataType>> => {
  function renderItemList() {
    return data.map((item, index) => (
      <div key={item.key} data-grid={{ x: 0, y: index, w: 1, h: 1 }}>
        {renderItem(item, index)}
      </div>
    ));
  }

  return (
    <GridLayout
      className="item-list"
      rowHeight={56}
      cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
      isResizable={false}
      isBounded={true}
      margin={[0, 16]}
      draggableHandle=".draggable-handle"
      children={renderItemList()}
    />
  );
};

export { ItemList };
