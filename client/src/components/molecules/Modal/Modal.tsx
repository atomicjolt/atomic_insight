import React from 'react';
import ReactModal from 'react-modal';

import { Button } from '../../atoms/Button/Button';
import './Modal.scss';

export type ModalProps = React.PropsWithChildren<{
  className?: string;
  title?: string;
  isOpen: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  cancelButtonClassName?: string;
  saveButtonClassName?: string;
  actionButtons?: React.ReactNode;
}>

export const Modal: React.FC<ModalProps> = ({
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
          {onCancel !== undefined ? (
            <Button buttonType={cancelButtonClassName} onClick={onCancel}>Cancel</Button>
          ) : null}
          {onSave ? (
            <Button buttonType={`btn--primary ${saveButtonClassName}`} onClick={onSave}>
              Save
            </Button>
          ) : null}
        </div>
      </div>
    </ReactModal>
  );
};
