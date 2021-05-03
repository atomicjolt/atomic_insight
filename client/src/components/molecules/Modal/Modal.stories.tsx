import React from 'react';
import { Story } from '@storybook/react';

import { Modal } from './Modal';

export default {
  title: 'Molecules/Modal',
  component: Modal,
};

export const Default: Story = () => (
  <Modal
    title="Default"
    isOpen={true}
    onSave={() => null}
    onCancel={() => null}
  />
);
