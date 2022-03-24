import type { Item, TreeMenuItem, TreeNodeInArray } from 'react-simple-tree-menu';

import classNames from 'classnames';
import React from 'react';
import TreeMenu from 'react-simple-tree-menu';

import './treeView.css';
import DropdownArrow from './icons/DropdownArrow';

export interface TreeNodeProps {
  nodes: TreeNodeInArray[];
}

interface ToggleIconProps {
  isOpen: boolean;
  hasNodes: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ToggleIcon = ({ isOpen: open, hasNodes, onClick }: ToggleIconProps) => {
  if (!hasNodes) {
    return null;
  }

  return (
    <div className="toggle-icon" onClick={onClick}>
      <DropdownArrow aria-label="Toggle" classname={classNames('symbol', { open })} />
    </div>
  );
};

const TreeItem = (props: TreeMenuItem) => {
  const { active, onClick, toggleNode, ...item } = props;
  const { hasNodes, isOpen, label, level } = item as Item;

  const listProps = {
    className: classNames(`tree-item tree-item-level${level}`, {
      'tree-item--active': active,
    }),
    style: { paddingLeft: `${(hasNodes ? 0 : 3) + level * 1.75}rem` },
    onClick: (e: React.MouseEvent<HTMLLIElement>) => {
      onClick(e);
    },
  };

  const toggleIconProps = {
    isOpen,
    hasNodes,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (hasNodes && toggleNode) {
        toggleNode();
      }
    },
  };

  return (
    <li {...listProps} role="button" aria-pressed={active}>
      <ToggleIcon {...toggleIconProps} />
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
          <ul className="tree-item-group">
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
