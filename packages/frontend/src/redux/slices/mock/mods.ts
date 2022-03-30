import { TreeNodeInArray } from 'react-simple-tree-menu';

import { ModInfo } from '../../../utils/interfaces';

export const mockModsList: ModInfo[] = [
  // ID: `${mod.meta.name.toLower().replace(' ', '_')-${mod.meta.version}}`
  { content: 'Better Rolling', id: 'better_rolling-0.2.0' },
  { content: 'This is a dummy mod', id: 'mod-0' },
  { content: 'This is another dummy mod', id: 'mod-1' },
  { content: 'This is a third, selected dummy mod', id: 'mod-2' },
  { content: 'This is a forth dummy mod', id: 'mod-3' },
];

export const fileData: { [id: string]: TreeNodeInArray[] } = {
  ['better_rolling-0.2.0']: [
    {
      key: 'better_rolling-0.2.0/Model',
      label: 'Model',
      nodes: [
        {
          key: 'better_rolling-0.2.0/Model/chr',
          label: 'chr',
          nodes: [
            {
              key: 'better_rolling-0.2.0/Model/chr/c0000',
              label: 'c0000',
              nodes: [
                {
                  key: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64',
                  label: 'hkxx64',
                  nodes: [
                    {
                      key: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64/mock_file_01.hkx',
                      label: 'mock_file_01.hkx',
                    },
                    {
                      key: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64/mock_file_02.hkx',
                      label: 'mock_file_02.hkx',
                    },
                    {
                      key: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64/mock_file_03.hkx',
                      label: 'mock_file_03.hkx',
                    },
                  ],
                },
                {
                  key: 'better_rolling-0.2.0/Model/chr/c0000/taeNew',
                  label: 'taeNew',
                  nodes: [
                    {
                      key: 'better_rolling-0.2.0/Model/chr/c0000/taeNew/x64',
                      label: 'x64',
                      nodes: [
                        {
                          key: 'better_rolling-0.2.0/Model/chr/c0000/taeNew/x64/a00.tae',
                          label: 'a00.tae',
                        },
                        {
                          key: 'better_rolling-0.2.0/Model/chr/c0000/taeNew/x64/a01.tae',
                          label: 'a01.tae',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  ['mod-0']: [
    {
      key: 'mod-0/foo',
      label: 'foo',
      nodes: [
        { key: 'mod-0/foo/bar', label: 'bar' },
        { key: 'mod-0/foo/baz', label: 'baz' },
      ],
    },
  ],
  ['mod-1']: [
    {
      key: 'mod-1/a',
      label: 'a',
      nodes: [
        { key: 'mod-1/a/b', label: 'b', nodes: [{ key: 'mod-1/a/b/c', label: 'c' }] },
        {
          key: 'mod-1/a/ab',
          label: 'ab',
          nodes: [{ key: 'mod-1/a/ab/abc', label: 'abc' }],
        },
      ],
    },
  ],
  ['mod-2']: [
    {
      key: 'mod-2/I',
      label: 'I',
      nodes: [
        {
          key: 'mod-2/I/like',
          label: 'like',
          nodes: [
            { key: 'mod-2/I/like/Pizza', label: 'Pizza' },
            { key: 'mod-2/I/like/Fish+Chips', label: 'Fish+Chips' },
            { key: 'mod-2/I/like/Chocolate', label: 'Chocolate' },
          ],
        },
      ],
    },
  ],
  ['mod-3']: [
    {
      key: 'mod-3/a',
      label: 'a',
      nodes: [
        {
          key: 'mod-3/a/a0',
          label: 'a',
          nodes: [
            {
              key: 'mod-3/a/a0/a0',
              label: 'a',
              nodes: [
                { key: 'mod-3/a/a0/a0/a0', label: 'a' },
                { key: 'mod-3/a/a0/a0/a1', label: 'a' },
              ],
            },
            {
              key: 'mod-3/a/a0/a1',
              label: 'a',
              nodes: [
                { key: 'mod-3/a/a0/a1/a0', label: 'a' },
                { key: 'mod-3/a/a0/a1/a1', label: 'a' },
              ],
            },
          ],
        },
        {
          key: 'mod-3/a/a1',
          label: 'a',
          nodes: [
            {
              key: 'mod-3/a/a1/a0',
              label: 'a',
              nodes: [
                { key: 'mod-3/a/a1/a0/a0', label: 'a' },
                { key: 'mod-3/a/a1/a0/a1', label: 'a' },
              ],
            },
            {
              key: 'mod-3/a/a1/a1',
              label: 'a',
              nodes: [
                { key: 'mod-3/a/a1/a1/a0', label: 'a' },
                { key: 'mod-3/a/a1/a1/a1', label: 'a' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
