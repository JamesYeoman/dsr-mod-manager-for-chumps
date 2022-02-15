import React, { Fragment } from 'react';

interface Props {
  modalIDPrefix: string;
  buttonText: string;
}

const ModalBtn = ({ modalIDPrefix, buttonText }: Props) => {
  const id = `${modalIDPrefix}-modal`;
  return (
    <Fragment>
      <label htmlFor={id} className="btn btn-primary modal-button" tabIndex={0}>
        {buttonText}
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
    </Fragment>
  );
};

export default ModalBtn;
