import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import './Grid.scss';

const GridLayout = WidthProvider(Responsive);

export const Grid = ({ children }: React.PropsWithChildren<any>) => {
  const [rowHeight, setRowHeight] = useState(10);

  const cardRatio = 4 / 5; // Ratio of height / width
  const cardScale = rowHeight / 240; // Ratio of height / standard height

  return (
    <GridLayout
      style={{ '--card-scale': cardScale }}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
      rowHeight={rowHeight}
      isResizable={false}
      margin={[15, 15]}
      containerPadding={[0, 0]}
      onWidthChange={(width, margin, cols, padding) => {
        // Calculates card height by subtracting margins and paddings from the width of container divided by columns
        const cardHeight = (width - margin[0] - padding[0] * cols) / cols;
        setRowHeight(cardHeight * cardRatio);
      }}
      children={children}
    />
  );
};

export default Grid;
