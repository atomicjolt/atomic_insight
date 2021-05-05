import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import './ItemList.scss';

const GridLayout = WidthProvider(Responsive);

export interface ItemListProps extends React.PropsWithChildren<any> {
  data: any;
  renderItem: () => any;
}

export const ItemList = ({
  data,
  renderItem,
}: React.PropsWithChildren<any>) => {
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
