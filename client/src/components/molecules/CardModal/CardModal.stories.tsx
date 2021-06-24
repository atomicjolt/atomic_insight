import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { CardModal } from './CardModal';
import { VisualKey } from '../../../common/constants/visual';
import { MetricKey } from '../../../common/constants/metric';

export default {
  title: 'Molecules/CardModal',
  component: CardModal,
};

const mockData = {
  key: 0,
  title: 'Card',
  metricKey: MetricKey.DiscussionPosts,
  visualKey: VisualKey.Icon,
};

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CardModal
      data={mockData}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};
