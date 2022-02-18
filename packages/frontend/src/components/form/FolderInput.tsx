import React from 'react';

import FolderIcon from '../icons/Folder';
import './folderInput.css';

interface Props {
  label: string;
  value: string;
  onBrowse: () => void;
}

const FolderInput = ({ label, value, onBrowse }: Props) => {
  return (
    <div className="grid grid-cols-12 flex-row flex-grow justify-center h-12 w-full my-1">
      <div className="cell-card col-span-2 text-right px-2">{label}</div>
      <div className="cell-card value-card">{value}</div>
      <button className="btn browse-button" onClick={onBrowse}>
        <FolderIcon />
      </button>
    </div>
  );
};

export default FolderInput;
