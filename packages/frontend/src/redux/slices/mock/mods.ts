import type { ModFileData, ModInfo } from '../../../utils/interfaces';

export const mockModsList: ModInfo[] = [
  // ID: `${mod.meta.name.toLower().replace(' ', '_')-${mod.meta.version}}`
  { content: 'Better Rolling', id: 'better_rolling-0.2.0' },
  { content: 'This is a dummy mod', id: 'mod-0' },
  { content: 'This is another dummy mod', id: 'mod-1' },
  { content: 'This is a third, selected dummy mod', id: 'mod-2' },
  { content: 'This is a forth dummy mod', id: 'mod-3' },
];

export const fileData: { [id: string]: ModFileData[] } = {
  ['better_rolling-0.2.0']: [
    { path: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64', filename: 'mock_file_01.hkx' },
    { path: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64', filename: 'mock_file_02.hkx' },
    { path: 'better_rolling-0.2.0/Model/chr/c0000/hkxx64', filename: 'mock_file_03.hkx' },
    { path: 'better_rolling-0.2.0/Model/chr/c0000/taeNew/x64', filename: 'a00.tae' },
    { path: 'better_rolling-0.2.0/Model/chr/c0000/taeNew/x64', filename: 'a01.tae' },
  ],
  ['mod-0']: [
    { path: 'mod-0/foo', filename: 'bar' },
    { path: 'mod-0/foo', filename: 'baz' },
  ],
  ['mod-1']: [
    { path: 'mod-1/a/b', filename: 'c' },
    { path: 'mod-1/a/ab', filename: 'abc' },
  ],
  ['mod-2']: [
    { path: 'mod-2/I/like/Pizza', filename: 'Pizza' },
    { path: 'mod-2/I/like/Fish+Chips', filename: 'Fish+Chips' },
    { path: 'mod-2/I/like/Chocolate', filename: 'Chocolate' },
  ],
  // Useful for checking overflow behaviour
  ['mod-3']: [
    { path: 'a/a/a/a/a', filename: 'a' },
    { path: 'a/a/a/a/b', filename: 'b' },

    { path: 'a/a/a/b/a', filename: 'a' },
    { path: 'a/a/a/b/b', filename: 'b' },

    { path: 'a/a/b/a/a', filename: 'a' },
    { path: 'a/a/b/a/b', filename: 'b' },

    { path: 'a/a/b/b/a', filename: 'a' },
    { path: 'a/a/b/b/b', filename: 'b' },

    { path: 'b/a/a/a/a', filename: 'a' },
    { path: 'b/a/a/a/b', filename: 'b' },

    { path: 'b/a/a/b/a', filename: 'a' },
    { path: 'b/a/a/b/b', filename: 'b' },

    { path: 'b/a/b/a/a', filename: 'a' },
    { path: 'b/a/b/a/b', filename: 'b' },

    { path: 'b/a/b/b/a', filename: 'a' },
    { path: 'b/a/b/b/b', filename: 'b' },
  ],
};
