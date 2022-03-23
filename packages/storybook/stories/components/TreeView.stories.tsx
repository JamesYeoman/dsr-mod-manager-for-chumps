import type { ComponentMeta, ComponentStory } from '@storybook/react';

import TreeView from '@dsrbmm/frontend/src/components/TreeView';
import React from 'react';

export default {
  title: 'Components/TreeView',
  component: TreeView,
} as ComponentMeta<typeof TreeView>;

const Template: ComponentStory<typeof TreeView> = (args) => (
  <div className="h-96">
    <TreeView {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  nodes: [
    {
      key: '0',
      label: 'Basic 0',
      nodes: [{ key: 'rogue_key', label: 'Rogue Key' }],
    },
    {
      key: '1',
      label: 'Basic 1',
      nodes: [
        { key: '1-0', label: 'Basic 1 - 0' },
        { key: '1-1', label: 'Basic 1 - 1' },
        {
          key: '1-2',
          label: 'Basic 1 - 2',
          nodes: [
            { key: '1-2-0', label: 'Basic 1 - 2 - 0' },
            { key: '1-2-1', label: 'Basic 1 - 2 - 1' },
            { key: '1-2-2', label: 'Basic 1 - 2 - 2' },
          ],
        },
      ],
    },
  ],
};
