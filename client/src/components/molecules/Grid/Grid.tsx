import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import React, { useState, CSSProperties } from 'react';
import 'react-grid-layout/css/styles.css';
import './Grid.scss';

const GridLayout = WidthProvider(Responsive);

interface CSSWithScale extends CSSProperties {
  '--card-scale': number;
}

export type GridProps = React.PropsWithChildren<{
  layout?: Layout[];
  isDraggable?: boolean;
}>

const baseCell = {
  width: 300,
  height: 112,
};

export const Grid: React.FC<GridProps> = ({
  children,
  layout,
  isDraggable = true,
}: GridProps) => {
  const [rowHeight, setRowHeight] = useState(baseCell.height);

  const cardRatio = baseCell.height / baseCell.width; // Ratio of height / width
  const cardScale = rowHeight / baseCell.height; // Ratio of height / standard height

  return (
    <GridLayout
      style={{ '--card-scale': cardScale } as CSSWithScale}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
      layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
      rowHeight={rowHeight}
      isResizable={false}
      isDraggable={isDraggable}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      onWidthChange={(width: number, margin: [number, number], cols: number): void => {
        // Calculates card height based on card width
        const cardWidth = (width - (margin[0] * (cols - 1))) / cols;
        const cardHeight = cardWidth * cardRatio;
        setRowHeight(cardHeight);
      }}
    >
      {children}
    </GridLayout>
  );
};

export default Grid;
