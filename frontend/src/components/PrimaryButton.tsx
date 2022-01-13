import React from 'react';

export interface PrimaryButtonProps {
  text: string;
  onClickHandler: () => void;
}

const PrimaryButton = ({ text, onClickHandler }: PrimaryButtonProps) => (
  <button className="btn btn-primary" tabIndex={0} onClick={onClickHandler}>
    {text}
  </button>
);

export default PrimaryButton;
