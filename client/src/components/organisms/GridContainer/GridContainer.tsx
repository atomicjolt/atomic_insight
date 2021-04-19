import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import 'react-grid-layout/css/styles.css';
import './GridContainer.scss';

const GridLayout = WidthProvider(Responsive);

export const GridContainer = ({ children }: React.PropsWithChildren<any>) => {
  const [rowHeight, setRowHeight] = useState(10);
  const [opened, setOpened] = useState('');
  const tileRatio = 4 / 5; // Ratio of height / width

  return (
    <div className={`grid-container ${opened}`}>
      <button onClick={() => setOpened(opened === 'close' ? 'open' : 'close')}>
        <FontAwesomeIcon icon={faCaretDown} />Pinned
      </button>
      <GridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        rowHeight={rowHeight}
        isResizable={false}
        margin={[15, 15]}
        containerPadding={[20, 20]}
        onWidthChange={(width, margin, cols, padding) => {
          // Calculates tile height by subtracting margins and paddings from the width of container divided by columns
          const tileHeight = ((width - margin[0] - (padding[0] * cols)) / cols);
          setRowHeight(tileHeight * tileRatio);
        }}
        children={children}
      />
    </div>
  );
};

export default GridContainer;
