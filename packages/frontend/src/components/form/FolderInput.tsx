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
      <div className="input-container__label cell-card">{label}</div>
      <div className="input-container__value cell-card">{value}</div>
      <button className="input-container__browse" onClick={onBrowse}>
        <FolderIcon />
      </button>
    </div>
  );
};

export default FolderInput;
