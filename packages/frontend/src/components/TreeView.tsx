import type { ReactNode } from 'react';
import type { Item, TreeMenuItem, TreeNodeInArray } from 'react-simple-tree-menu';

import React from 'react';
import TreeMenu from 'react-simple-tree-menu';
import { match } from 'ts-pattern';

import DropdownArrow from './icons/DropdownArrow';
import FileIcon from './icons/File';

export interface TreeNodeProps {
  nodes: TreeNodeInArray[];
}

interface ToggleIconProps {
  isOpen: boolean;
  hasNodes: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ToggleIcon = ({ isOpen, hasNodes, onClick }: ToggleIconProps) => {
  const dataProps = { 'data-toggle': hasNodes, 'data-open': isOpen };

  return (
    <div {...dataProps} className="toggle-icon" onClick={onClick}>
      {match<boolean, ReactNode>(hasNodes)
        .with(true, () => <DropdownArrow aria-label="Toggle" className="symbol" />)
        .with(false, () => <FileIcon className="symbol file" />)
        .exhaustive()}
    </div>
  );
};

const TreeItem = (props: TreeMenuItem) => {
  const { active, onClick, toggleNode, ...item } = props;
  const { hasNodes, isOpen, label, level } = item as Item;

  const listProps = {
    className: `tree-item`,
    'data-active': active,
    style: {
      ['--node-level' as any]: level,
    },
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
        <span>{label}</span>
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
