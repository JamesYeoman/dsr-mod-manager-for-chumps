import type { Item, TreeMenuItem, TreeNodeInArray } from 'react-simple-tree-menu';

import classNames from 'classnames';
import React from 'react';
import TreeMenu from 'react-simple-tree-menu';

import './treeView.css';

export interface TreeNodeProps {
  nodes: TreeNodeInArray[];
}

interface ToggleIconProps {
  isOpen: boolean;
  hasNodes: boolean;
}

const ToggleIcon = ({ isOpen, hasNodes }: ToggleIconProps) => {
  if (!hasNodes) {
    return null;
  }

  return (
    <div className="rstm-toggle-icon">
      <div role="img" aria-label="Toggle" className="rstm-toggle-icon-symbol">
        {isOpen ? '-' : '+'}
      </div>
    </div>
  );
};

const TreeItem = (props: TreeMenuItem) => {
  const { active, onClick, toggleNode, ...item } = props;
  const { hasNodes, isOpen, label, level } = item as Item;

  const listProps = {
    className: classNames(`rstm-tree-item rstm-tree-item-level${level}`, {
      'rstm-tree-item--active': active,
    }),
    style: { paddingLeft: `${(hasNodes ? 0 : 3) + level * 1.75}rem` },
    onClick: (e: React.MouseEvent<HTMLLIElement>) => {
      onClick(e);

      if (hasNodes && toggleNode) {
        toggleNode();
      }
    },
  };

  return (
    <li {...listProps} role="button" aria-pressed={active}>
      <ToggleIcon {...{ isOpen, hasNodes }} />
      <div className="tree-item-content">
        <span onClick={(e) => e.stopPropagation()}>{label}</span>
      </div>
    </li>
  );
};

//TODO: integrate with app
const TreeView = (props: TreeNodeProps) => {
  return (
    <div className="tree-container">
      <TreeMenu data={props.nodes}>
        {({ items }) => (
          <ul className="rstm-tree-item-group">
            {items.map(({ key, ...item }) => (
              <TreeItem key={key} {...item}></TreeItem>
            ))}
          </ul>
        )}
      </TreeMenu>
    </div>
  );
};

export default TreeView;
