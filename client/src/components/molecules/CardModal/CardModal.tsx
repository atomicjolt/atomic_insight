import React, { useState } from 'react';
import './CardModal.scss';

import type { CardData } from '../Card/Card';

import { CardImpact, CardDisplay, CardSize } from '../../../common/constants/card';
import { VisualKey } from '../../../common/constants/visual';
import { findByKey } from '../../../common/utils/find';

import metrics from '../../../metrics';
import { Modal } from '../Modal/Modal';
import { Input } from '../../atoms/Input/Input';
import { Select } from '../../atoms/Select/Select';

const impactOptions = [
  { value: CardImpact.None, title: 'None' },
  { value: CardImpact.Low, title: 'Low' },
  { value: CardImpact.High, title: 'High' },
];

const displayOptions = [
  { value: CardDisplay.Value, title: 'Value' },
  { value: CardDisplay.Comparison, title: 'Comparison' },
  { value: CardDisplay.Trend, title: 'Trend' },
];

const metricOptions = metrics.map((m) => ({ value: m.key, title: m.title }));

const visualOptions = [{ value: VisualKey.Icon, title: 'Icon' }];
const sizeOptions = [
  { value: CardSize.Half, title: 'Half' },
  { value: CardSize.Normal, title: 'Normal' },
  { value: CardSize.Double, title: 'Double' },
  { value: CardSize.Full, title: 'Full' },
];

export interface CardModalProps {
  data: CardData;
  onChange?: (CardData) => void;
  isOpen: boolean;
  setIsOpen: (boolean) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  data: initialData,
  onChange = () => {},
  isOpen,
  setIsOpen,
}: CardModalProps) => {
  const [data, setData] = useState(initialData);

  const metric = findByKey(metrics, data.metricKey);
  const cardTitle = data.title !== undefined ? data.title : metric?.title;

  function _saveCard() {
    setIsOpen(false);

    if (data.title === '') data.title = undefined;
    onChange(data);
  }

  return (
    <Modal
      className="edit-card-modal"
      title="Edit Card"
      isOpen={isOpen}
      onSave={_saveCard}
      onCancel={() => setIsOpen(false)}
    >
      <form className="edit-card-modal__grid" onSubmit={() => null}>
        <Input
          gridAreaStyle="name"
          label="Name"
          value={cardTitle}
          onChange={(title) => setData({ ...data, title })}
        />
        <Select
          gridAreaStyle="impact"
          label="Impact"
          options={impactOptions}
          selectedValue={data.impact}
          onChange={(impact) => setData({ ...data, impact })}
        />
        <Select
          gridAreaStyle="metric"
          label="Metric"
          options={metricOptions}
          selectedValue={data.metricKey}
          onChange={(metricKey) => setData({ ...data, metricKey })}
          searchable={true}
        />
        <Select
          gridAreaStyle="visual"
          label="Visualization"
          options={visualOptions}
          selectedValue={data.visualKey}
          onChange={(visualKey) => setData({ ...data, visualKey })}
        />
        <Select
          gridAreaStyle="display"
          label="Display"
          options={displayOptions}
          selectedValue={data.display}
          onChange={(display) => setData({ ...data, display })}
        />
        <Select
          gridAreaStyle="size"
          label="Size"
          options={sizeOptions}
          selectedValue={data.size}
          onChange={(size) => setData({ ...data, size })}
        />
      </form>
    </Modal>
  );
};
