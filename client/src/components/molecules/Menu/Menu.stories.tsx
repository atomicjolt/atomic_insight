import React from 'react';
import { Story } from '@storybook/react';

import { Menu } from './Menu';

export default {
  title: 'Molecules/Menu',
  component: Menu,
};

export const Default: Story = () => (
  <Menu isOpen={true}>
    <li>
      <button>
        <i className="material-icons-outlined">more_horiz</i>
        <span>Manage Panels</span>
      </button>
    </li>
    <li>
      <button>
        <i className="material-icons-outlined" aria-hidden="false">
          settings
        </i>
        <span>Admin Settings</span>
      </button>
    </li>
    <li>
      <button>
        <i className="material-icons-outlined" aria-hidden="true">
          settings
        </i>
        <span>Course Settings</span>
      </button>
    </li>
  </Menu>
);
