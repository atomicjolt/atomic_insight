import React from 'react';
import ReactModal from 'react-modal';

import { Button } from '../../atoms/Button/Button';
import './Modal.scss';

export interface ModalProps extends React.PropsWithChildren<any> {
  className?: string;
  title?: string;
  isOpen: boolean;
  onCancel?: any;
  onSave?: any;
  cancelButtonClassName?: string;
  saveButtonClassName?: string;
  actionButtons?: any;
}

export const Modal = ({
  title,
  isOpen,
  onCancel,
  onSave,
  cancelButtonClassName,
  saveButtonClassName,
  actionButtons,
  className,
  children,
}: ModalProps) => {
  return (
    <ReactModal isOpen={isOpen} className={`modal ${className}`}>
      <div className="modal__header">
        <h1>{title}</h1>
        <button onClick={onCancel}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div>{children}</div>
      <div className="modal__footer">
        <div>{actionButtons}</div>
        <div>
          {onCancel ? <Button className={cancelButtonClassName} onClick={onCancel}>Cancel</Button> : null}
          {onSave ? (
            <Button className={`btn--primary ${saveButtonClassName}`} onClick={onSave}>
              Save
            </Button>
          ) : null}
        </div>
      </div>
    </ReactModal>
  );
};
