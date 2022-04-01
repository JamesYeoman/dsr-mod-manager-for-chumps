import React from 'react';

export interface AcceptRejectProps {
  onAccept: () => void;
  onReject: () => void;
}

const AcceptReject = ({ onAccept, onReject }: AcceptRejectProps) => {
  return (
    <div className="modal__action">
      <button className="btn-accept" onClick={onAccept}>
        Save
      </button>
      <button className="btn-reject" onClick={onReject}>
        Cancel
      </button>
    </div>
  );
};

export default AcceptReject;
