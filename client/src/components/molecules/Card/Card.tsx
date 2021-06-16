import React, { useState, useEffect } from 'react';
import './Card.scss';

import { CardImpact, CardDisplay, CardSize } from '../../../common/constants';
import { IconVisual } from '../IconVisual/IconVisual';
import { CardModal } from '../CardModal/CardModal';

export interface CardData {
  key: number;
  title?: string;
  pinned?: boolean;
  metric?: number;            // TODO: create metric type
  visual?: React.FC;          // TODO: create visual type
  impact?: CardImpact;
  display?: CardDisplay;
  size?: CardSize;
  metricData?: {              // The `metricData` field is temporary
    value: number;            // and will eventually come from a metric model
    comparisonValue: number;
  }
}

const defaultData: CardData = {
  key: 0,
  title: 'Card',
  pinned: false,
  metric: 0,
  visual: IconVisual,
  impact: CardImpact.Low,
  display: CardDisplay.Value,
  size: CardSize.Normal,
  metricData: {
    value: 0,
    comparisonValue: 1,
  }
};

export type CardProps = React.PropsWithChildren<{
  data?: CardData;
  onChange?: (CardData) => void;
  setGridIsDraggable?: (boolean) => void;
}>;

export const Card: React.FC<CardProps> = ({
  data: initialData = { key: 0 },
  onChange = () => {},
  setGridIsDraggable = () => {},
}: CardProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ ...defaultData, ...initialData });

  const Visual = data.visual;
  const visualProps = {
    display: data.display,
    size: data.size,
    data: data.metricData,
  } as React.Attributes;

  const impactText = data.impact
    ? {
      [CardImpact.Low]: 'Low Impact',
      [CardImpact.High]: 'High Impact',
    }[data.impact]
    : '';

  useEffect(() => {
    onChange(data);
  }, [data]);

  useEffect(() => {
    setGridIsDraggable(!modalIsOpen);
  }, [modalIsOpen]);

  return (
    <div className="card" key={data.key}>
      <div className="card-header">
        <h4 className="title">{data.title}</h4>
        {data.impact ? (
          <div className="card-impact">
            <h5 className={`impact-title impact-${data.impact}`}>
              {impactText}
            </h5>
          </div>
        ) : null}
        <div className="card-buttons">
          <button onClick={() => setData({ ...data, pinned: !data.pinned })}>
            <i
              className={`material-icons${data.pinned ? '' : '-outlined'} pin`}
            >
              push_pin
            </i>
          </button>
          <button onClick={() => setModalIsOpen(true)}>
            <i className="material-icons-outlined">edit</i>
          </button>
        </div>
      </div>
      <div className="card-contents">
        {Visual ? <Visual {...visualProps} /> : null}
      </div>
      <CardModal data={data} onChange={setData} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </div>
  );
};
