import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import './Grid.scss';

const GridLayout = WidthProvider(Responsive);

export interface GridProps extends React.PropsWithChildren<any> {
  layout?: any[];
}

const baseCell = {
  width: 300,
  height: 112,
};

export const Grid = ({ children, layout }: GridProps) => {
  const [rowHeight, setRowHeight] = useState(baseCell.height);

  const cardRatio = baseCell.height / baseCell.width; // Ratio of height / width
  const cardScale = rowHeight / baseCell.height; // Ratio of height / standard height

  // Formated layout
  const fLayout = layout?.map((card) => {
    const fCard = card;
    fCard.i = String(fCard.i);
    return fCard;
  }) ?? undefined;

  return (
    <GridLayout
      style={{ '--card-scale': cardScale }}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
      rowHeight={rowHeight}
      isResizable={false}
      margin={[16, 16]}
      layouts={{ lg: fLayout, md: fLayout, sm: fLayout, xs: fLayout, xxs: fLayout }}
      containerPadding={[0, 0]}
      onWidthChange={(width, margin, cols) => {
        // Calculates card height based on card width
        const cardWidth = (width - (margin[0] * (cols - 1))) / cols;
        const cardHeight = cardWidth * cardRatio;
        setRowHeight(cardHeight);
      }}
      children={children}
    />
  );
};

export default Grid;
