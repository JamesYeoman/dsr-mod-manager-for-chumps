import type { ModFileData } from './interfaces';
import type { TreeNodeInArray } from 'react-simple-tree-menu';

const toTreeNode = (name: string, parent: string) => {
  const data: TreeNodeInArray = {
    key: `${parent}/${name}`,
    label: name,
  };

  return data;
};

const appendToAcc = (accumulator: TreeNodeInArray[], value: string) => {
  if (accumulator.length === 0) {
    throw new Error('Accumulator should not be empty');
  }
  return [...accumulator, toTreeNode(value, accumulator[accumulator.length - 1].key)];
};

const unflattenPath = (toUnflatten: string, startingObj: TreeNodeInArray[]) =>
  toUnflatten.split('/').reduce(appendToAcc, startingObj);

export const unflattenFileData = (data: ModFileData[], modId: string) => {
  const rootNode: TreeNodeInArray = { key: modId, label: modId, nodes: [] };
  const paths = data.map((props) => `${props.path}/${props.filename}`);
  const accumulator = paths.map((path) => unflattenPath(path, [rootNode])).flat();

  const deduped = accumulator.reduce((acc, node) => {
    const collector = [...acc];

    if (node.key === rootNode.key) {
      return collector;
    }

    if (acc.some((path) => node.key === path.key)) {
      return collector;
    }

    collector.push(node);
    return collector;
  }, [] as TreeNodeInArray[]);

  const accumulated: TreeNodeInArray[] = [{ ...rootNode }];

  deduped.forEach((node) => {
    const duped = { ...node };
    const parentKey = duped.key.slice(0, duped.key.lastIndexOf('/'));
    const parentNode = accumulated.find((treeNode) => parentKey === treeNode.key);

    if (!parentNode) {
      throw "This shouldn't happen! The unflattening method is broken!";
    }

    if (!parentNode.nodes) {
      parentNode.nodes = [];
    }

    parentNode.nodes.push(duped);
    accumulated.push(duped);
  });

  if (!rootNode.nodes) {
    return [];
  }

  return rootNode.nodes;
};

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;

  describe('unflattenPath', () => {
    it('should correctly flatten', () => {
      const path = 'b/c/d/e';
      expect(unflattenPath(path, [{ key: 'a', label: 'a' }])).toEqual([
        { key: 'a', label: 'a' },
        { key: 'a/b', label: 'b' },
        { key: 'a/b/c', label: 'c' },
        { key: 'a/b/c/d', label: 'd' },
        { key: 'a/b/c/d/e', label: 'e' },
      ]);
    });
  });
}
