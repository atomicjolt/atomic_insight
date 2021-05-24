import React  from 'react';
import 'react-grid-layout/css/styles.css';
import './GridContainer.scss';
import Panel from '../../molecules/Panel/Panel';
import Grid from '../../molecules/Grid/Grid';

export interface GridContainerProps extends React.PropsWithChildren<any> {
  title: string;
  layout?: [];
}

export const GridContainer = ({ children, title, layout }: GridContainerProps) => {
  return (
    <Panel title={title}>
      <Grid children={children} layout={layout} />
    </Panel>
  );
};

export default GridContainer;
