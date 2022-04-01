import type { AcceptRejectProps } from './actions/AcceptReject';
import type { CloseProps } from './actions/Close';
import type { ReactNode } from 'react';

import cx from 'classnames';
import React from 'react';

import AcceptReject from './actions/AcceptReject';
import Close from './actions/Close';

export interface BaseModalProps {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  actionProps: AcceptRejectProps | CloseProps;
}

interface ModalActionsProps {
  actionProps: AcceptRejectProps | CloseProps;
}

const ModalActions = ({ actionProps }: ModalActionsProps) => {
  if ('onAccept' in actionProps) {
    return <AcceptReject {...actionProps} />;
  }

  return <Close {...actionProps} />;
};

const BaseModal = ({ children, isOpen, title, actionProps }: BaseModalProps) => {
  return (
    <div className={cx('modal', { 'modal-open': isOpen })}>
      <div className="modal__content">
        <div>
          <h1 className="modal-title">{title}</h1>
          <div className="divider" />
          {children}
        </div>
        <div>
          <div className="divider" />
          <ModalActions actionProps={actionProps} />
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
