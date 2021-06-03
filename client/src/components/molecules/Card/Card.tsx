import React  from 'react';
import './Card.scss';

export enum Impact {
  Low = 'Low Impact',
  High = 'High Impact'
}

export type CardProps = React.PropsWithChildren<{
  title: string;
  className?: string;
  impact?: Impact;
  pinned?: boolean;
  onEdit?: () => void;
  onPin?: (b: boolean) => void;
}>

export const Card: React.FC<CardProps> = ({
  className,
  children,
  title,
  impact,
  pinned = false,
  onEdit, onPin
}: CardProps) => {
  return (
    <div
      className={`card ${className || ''}`}
    >
      <div className="card-header">
        <h4 className="title">{title}</h4>
        {impact ? (
          <div className="card-impact">
            <h5 className={`impact-title ${impact === Impact.High ? 'impact-high' : 'impact-low'}`}>{impact}</h5>
          </div>
        ) : null}
        <div className="card-buttons">
          <button onClick={() => onPin && onPin(!pinned)}>
            <i className={`material-icons${pinned ? '' : '-outlined'} pin`}>push_pin</i>
          </button>
          <button onClick={onEdit}>
            <i className="material-icons-outlined">edit</i>
          </button>
        </div>
      </div>
      <div className="card-contents">
        {children}
      </div>
    </div>
  );
};
