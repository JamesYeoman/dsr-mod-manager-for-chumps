import React from 'react';

import FolderIcon from '../icons/Folder';

interface Props {
  label: string;
  value: string;
  onBrowse: () => void;
}

const FolderInput = ({ label, value, onBrowse }: Props) => {
  return (
    <div className="input-container">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      <button className="browse" onClick={onBrowse}>
        <FolderIcon />
      </button>
    </div>
  );
};

export default FolderInput;
