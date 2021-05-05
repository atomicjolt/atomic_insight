import React  from 'react';
import 'react-grid-layout/css/styles.css';
import './GridContainer.scss';
import Panel from '../../molecules/GridPanel/Panel';
import Grid from '../../molecules/Grid/Grid';

export interface ButtonProps extends React.PropsWithChildren<any> {
  title: string;
}

export const GridContainer = ({ children, title }: ButtonProps) => {
  return (
    <Panel title={title}>
      <Grid children={children} />
    </Panel>
  );
};

export default GridContainer;
