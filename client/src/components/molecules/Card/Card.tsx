import React, { useState, useEffect } from 'react';
import './Card.scss';

import { CardImpact, CardDisplay, CardSize } from '../../../common/constants';

import { Modal } from '../Modal/Modal';
import { Input } from '../../atoms/Input/Input';
import { Select, OptionKey } from '../../atoms/Select/Select';
import { IconVisual } from '../IconVisual/IconVisual';

const impactOptions = [
  { key: CardImpact.Low, title: 'Low' },
  { key: CardImpact.High, title: 'High' },
];

const displayOptions = [
  { key: CardDisplay.Value, title: 'Value' },
  { key: CardDisplay.Comparison, title: 'Comparison' },
  { key: CardDisplay.Trend, title: 'Trend' },
];

// TODO: Get supported metrics from somewhere...
const metricOptions = [
  { key: 0, title: 'Discussion Posts' },
  { key: 1, title: 'Assignment Submissions' },
  { key: 2, title: 'Metric 3' },
  { key: 3, title: 'Metric 4' },
  { key: 4, title: 'Metric 5' },
];

// TODO: Get real visual & size options based on metric type & display
//       and move these inside metric models
const visualOptions = [{ key: IconVisual, title: 'Icon' }];
const sizeOptions = [
  { key: CardSize.Half, title: 'Half' },
  { key: CardSize.Normal, title: 'Normal' },
  { key: CardSize.Double, title: 'Double' },
  { key: CardSize.Full, title: 'Full' },
];

export interface CardData {
  key: number;
  title?: string;
  pinned?: boolean;
  metric?: OptionKey;         // TODO: create metric type
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
}>;

export const Card: React.FC<CardProps> = ({
  onChange = () => null,
  data: initialData = { key: 0 },
}: CardProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [data, setData] = useState({ ...defaultData, ...initialData });
  const [temp, setTemp] = useState(defaultData);

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

  function _editCard() {
    setTemp(data);
    setModalIsOpen(true);
  }

  function _saveCard() {
    setData(temp);
    setModalIsOpen(false);
  }

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
          <button onClick={_editCard}>
            <i className="material-icons-outlined">edit</i>
          </button>
        </div>
      </div>
      <div className="card-contents">
        {data.visual ? React.createElement(data.visual, visualProps) : null}
      </div>
      <Modal
        className="edit-card-modal"
        title="Edit Card"
        isOpen={modalIsOpen}
        onSave={_saveCard}
        onCancel={() => setModalIsOpen(false)}
      >
        <form className="edit-card-modal__grid" onSubmit={() => null}>
          <Input
            gridArea="name"
            label="Name"
            value={temp.title}
            onChange={(title) => setTemp({ ...temp, title })}
          />
          <Select
            gridArea="impact"
            label="Impact"
            options={impactOptions}
            selectedKey={temp.impact}
            onChange={(impact) => setTemp({ ...temp, impact })}
          />
          <Select
            gridArea="metric"
            label="Metric"
            options={metricOptions}
            selectedKey={temp.metric}
            onChange={(metric) => setTemp({ ...temp, metric })}
            searchable={true}
          />
          <Select
            gridArea="visual"
            label="Visualization"
            options={visualOptions}
            selectedKey={temp.visual}
            onChange={(visual) => setTemp({ ...temp, visual })}
          />
          <Select
            gridArea="display"
            label="Display"
            options={displayOptions}
            selectedKey={temp.display}
            onChange={(display) => setTemp({ ...temp, display })}
          />
          <Select
            gridArea="size"
            label="Size"
            options={sizeOptions}
            selectedKey={temp.size}
            onChange={(size) => setTemp({ ...temp, size })}
          />
        </form>
      </Modal>
    </div>
  );
};
