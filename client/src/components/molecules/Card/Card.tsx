import React, { useState, useEffect } from 'react';
import './Card.scss';

import { CardImpact, CardDisplay, CardSize } from '../../../common/constants/card';
import { MetricKey } from '../../../common/constants/metric';
import { VisualKey } from '../../../common/constants/visual';
import metrics from '../../../metrics';

import { CardModal } from '../CardModal/CardModal';
import { Visual } from '../Visual/Visual';
import { findByKey } from '../../../common/utils/find';

export interface CardData {
  key: number;
  metricKey?: MetricKey;
  visualKey?: VisualKey;
  title?: string;
  pinned?: boolean;
  impact?: CardImpact;
  size?: CardSize;
  display?: CardDisplay;
}

const defaultData: CardData = {
  key: 0,
  pinned: false,
  display: CardDisplay.Value,
  size: CardSize.Normal,
};

export type CardProps = React.PropsWithChildren<{
  data: CardData;
  onChange?: (CardData) => void;
  setGridIsDraggable?: (boolean) => void;
}>;

export const Card: React.FC<CardProps> = ({
  data: initialData,
  onChange = () => {},
  setGridIsDraggable = () => {},
}: CardProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ ...defaultData, ...initialData });

  const metric = findByKey(metrics, data.metricKey);
  const cardTitle = data.title !== undefined ? data.title : metric?.title;

  const isImpact = data.impact !== undefined && data.impact !== CardImpact.None;
  const impactText = isImpact && data.impact
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
        <h4 className="title">{cardTitle}</h4>
        {isImpact ? (
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
        {data.visualKey !== undefined ? (
          <Visual
            visualKey={data.visualKey}
            display={data.display}
            size={data.size}
            metric={metric}
          />
        ) : null}
      </div>
      <CardModal
        data={data}
        onChange={setData}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </div>
  );
};
