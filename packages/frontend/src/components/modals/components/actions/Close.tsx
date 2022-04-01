import React from 'react';

export interface CloseProps {
  onClose: () => void;
}

const Close = ({ onClose }: CloseProps) => {
  return (
    <div className="modal-action justify-center">
      <button className="btn-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Close;
