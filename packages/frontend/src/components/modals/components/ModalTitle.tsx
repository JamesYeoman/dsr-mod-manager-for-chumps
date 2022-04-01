import React from 'react';

export interface ModalTitleProps {
  value?: string;
}

const ModalTitle = ({ value }: ModalTitleProps) => {
  if (!value) {
    return null;
  }

  return (
    <>
      <h1 className="modal-title">{value}</h1>
      <div className="divider" />
    </>
  );
};

export default ModalTitle;
