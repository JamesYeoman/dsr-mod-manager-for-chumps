import React from 'react';

interface Props {
  modalIDPrefix: string;
  buttonText: string;
}

const ModalBtn = ({ modalIDPrefix, buttonText }: Props) => {
  const id = `${modalIDPrefix}-modal`;
  return (
    <React.Fragment>
      <label htmlFor={id} className="btn btn-primary modal-button" tabIndex={0}>
        {buttonText}
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
    </React.Fragment>
  );
};

export default ModalBtn;
