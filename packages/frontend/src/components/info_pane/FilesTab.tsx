import React from 'react';

import { useAppSelector } from '../../utils/hooks';
import TreeView from '../TreeView';

const FilesTab = () => {
  const fileInfo = useAppSelector((state) => state.mods.fileList);

  return (
    <div className="files-tab__file-list">
      <TreeView nodes={fileInfo} />
    </div>
  );
};

export default FilesTab;
