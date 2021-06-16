import React, { useState } from 'react';
import './CardModal.scss';

import type { CardData } from '../Card/Card';

import { CardImpact, CardDisplay, CardSize } from '../../../common/constants';
import { Modal } from '../Modal/Modal';
import { IconVisual } from '../IconVisual/IconVisual';
import { Input } from '../../atoms/Input/Input';
import { Select } from '../../atoms/Select/Select';

const impactOptions = [
  { value: CardImpact.Low, title: 'Low' },
  { value: CardImpact.High, title: 'High' },
];

const displayOptions = [
  { value: CardDisplay.Value, title: 'Value' },
  { value: CardDisplay.Comparison, title: 'Comparison' },
  { value: CardDisplay.Trend, title: 'Trend' },
];

// TODO: Get supported metrics from somewhere...
const metricOptions = [
  { value: 0, title: 'Discussion Posts' },
  { value: 1, title: 'Assignment Submissions' },
  { value: 2, title: 'Metric 3' },
  { value: 3, title: 'Metric 4' },
  { value: 4, title: 'Metric 5' },
];

// TODO: Get real visual & size options based on metric type & display
//       and move these inside metric models
const visualOptions = [{ value: IconVisual, title: 'Icon' }];
const sizeOptions = [
  { value: CardSize.Half, title: 'Half' },
  { value: CardSize.Normal, title: 'Normal' },
  { value: CardSize.Double, title: 'Double' },
  { value: CardSize.Full, title: 'Full' },
];

export interface CardModalProps {
  data: CardData;
  onChange: (CardData) => void;
  isOpen: boolean;
  setIsOpen: (boolean) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  data: initialData,
  onChange,
  isOpen,
  setIsOpen,
}: CardModalProps) => {
  const [data, setData] = useState(initialData);

  function _saveCard() {
    setIsOpen(false);
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
          value={data.title}
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
          selectedValue={data.metric}
          onChange={(metric) => setData({ ...data, metric })}
          searchable={true}
        />
        <Select
          gridAreaStyle="visual"
          label="Visualization"
          options={visualOptions}
          selectedValue={data.visual}
          onChange={(visual) => setData({ ...data, visual })}
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
