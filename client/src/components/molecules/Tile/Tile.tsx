import React  from 'react';
import './Tile.scss';

export enum Impact {
  Low = "Low Impact",
  High = "High Impact"
}

export interface TileProps extends React.PropsWithChildren<any> {
  title: string;
  className?: string;
  impact: Impact;
  pinned: boolean;
  onEdit?: () => void;
  onPin?: (b: boolean) => void;
}

export const Tile = ({ className, children, title, impact, pinned, onEdit, onPin }: TileProps) => {
  return (
    <div
      className={`grid-tile ${className || ''}`}
    >
      <div className="tile-header">
        <h4 className="title">{title}</h4>
        <div className="tile-impact">
          <h5 className={`impact-title ${impact === Impact.High ? 'impact-high' : 'impact-low'}`}>{impact}</h5>
        </div>
        <div className="tile-buttons">
          <button onClick={() => onPin && onPin(!pinned)}>
            <i className={`material-icons${pinned ? '' : '-outlined'}`}>push_pin</i>
          </button>
          <button onClick={onEdit}>
            <i className="material-icons-outlined">edit</i>
          </button>
        </div>
      </div>
      <div className="tile-contents">
        {children}
      </div>
    </div>
  );
};
