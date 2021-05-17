import React from 'react';
import { Story } from '@storybook/react';

import { GridContainer } from './GridContainer';
import { Impact, Card } from '../../molecules/Card/Card';

export default {
  title: 'Organisms/GridContainer',
  component: GridContainer,
};

export const Default: Story = () =>
  <GridContainer title="Default">
    <div key={1} data-grid={{ x: 0, y: 0, w: 1, h: 1 }}>
      <Card title="Card1" impact={Impact.High} pinned={false}>
        CardContents
      </Card>
    </div>
    <div key={2} data-grid={{ x: 1, y: 0, w: 1, h: 1 }}>
      <Card title="Card2" impact={Impact.Low} pinned={false}>
        CardContents
      </Card>
    </div>
    <div key={3} data-grid={{ x: 2, y: 0, w: 1, h: 1 }}>
      <Card title="Card3" impact={Impact.High} pinned={false}>
        CardContents
      </Card>
    </div>
    <div key={4} data-grid={{ x: 0, y: 1, w: 1, h: 0.5 }}>
      <Card title="Card4" impact={Impact.Low} pinned={false}>
        CardContents
      </Card>
    </div>
  </GridContainer>;
