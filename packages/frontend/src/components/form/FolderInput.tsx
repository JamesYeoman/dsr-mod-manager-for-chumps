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
    <div className="input-container">
      <div className="cell-card input-label">{label}</div>
      <div className="cell-card input-value">{value}</div>
      <button className="browse-button" onClick={onBrowse}>
        <FolderIcon />
      </button>
    </div>
  );
};

export default FolderInput;
