import React, { useState, useEffect } from 'react';
import './CardModal.scss';

import type { CardData } from '../Card/Card';

import {
  CardImpact,
  CardDisplay,
  CardSize,
} from '../../../common/constants/card';
import { MetricType } from '../../../common/constants/metric';
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

const visualOptions = {
  icon: { value: VisualKey.Icon, title: 'Icon' },
  table: { value: VisualKey.Table, title: 'Table' },
};

const sizeOptions = {
  half: { value: CardSize.Half, title: 'Half' },
  normal: { value: CardSize.Normal, title: 'Normal' },
  double: { value: CardSize.Double, title: 'Double' },
  full: { value: CardSize.Full, title: 'Full' },
};

// Mapping for: metricType – display – visual
const metricTypeDisplayVisualOptions = {
  [MetricType.Metric]: {
    [CardDisplay.Value]: [
      visualOptions.icon,
      // visualOptions.percentage,
      // visualOptions.list,
    ],
    [CardDisplay.Comparison]: [
      visualOptions.icon,
      // visualOptions.percentage,
    ],
    [CardDisplay.Trend]: [
      // visualOptions.lineGraph,
      // visualOptions.percentage,
    ],
  },
  [MetricType.MetricGroup]: {
    [CardDisplay.Value]: [
      visualOptions.icon,
      visualOptions.table,
      // visualOptions.barGraph,
    ],
    [CardDisplay.Comparison]: [
      visualOptions.icon,
      visualOptions.table,
      // visualOptions.barGraph,
    ],
    [CardDisplay.Trend]: [
      // visualOptions.multiLineGraph,
      // visualOptions.stackedBarGraph,
    ],
  }
};

const visualKeySizeOptions = {
  [VisualKey.Icon]: [
    sizeOptions.half,
    sizeOptions.normal
  ],
  [VisualKey.Table]: [
    sizeOptions.normal
  ],
};

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
  if (isOpen === false) return null;

  const [data, setData] = useState(initialData);

  const metric = findByKey(metrics, data.metricKey);
  const cardTitle = data.title !== undefined ? data.title : metric?.title;
  const isCardValid = data.visualKey !== undefined && data.size !== undefined;

  let dynamicVisualOptions, dynamicSizeOptions;
  if (metric?.type !== undefined && data.display !== undefined) {
    dynamicVisualOptions = metricTypeDisplayVisualOptions[metric.type][data.display];
    if (dynamicVisualOptions.length > 0) {
      const visualKey = data.visualKey !== undefined ? data.visualKey : dynamicVisualOptions[0].value;
      dynamicSizeOptions = visualKeySizeOptions[visualKey];
    } else {
      dynamicSizeOptions = [];
    }
  }

  useEffect(() => {
    if (data.visualKey === undefined && dynamicVisualOptions.length > 0) {
      setData({ ...data, visualKey: dynamicVisualOptions[0].value });
    }
    if (data.size === undefined && dynamicSizeOptions.length > 0) {
      setData({ ...data, size: dynamicSizeOptions[0].value });
    }
  }, [data, dynamicVisualOptions, dynamicSizeOptions]);

  function _saveCard() {
    if (isCardValid) {
      setIsOpen(false);
      if (data.title === '') data.title = undefined;
      onChange(data);
    }
  }

  return (
    <Modal
      className={`edit-card-modal ${isCardValid ?  '' : 'invalid'}`}
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
          onChange={(metricKey) =>
            setData({
              ...data,
              metricKey,
              visualKey: undefined,
              size: undefined,
            })
          }
          searchable={true}
        />
        <Select
          gridAreaStyle="display"
          label="Display"
          options={displayOptions}
          selectedValue={data.display}
          onChange={(display) =>
            setData({
              ...data,
              display,
              visualKey: undefined,
              size: undefined,
            })
          }
        />
        <Select
          gridAreaStyle="visual"
          label="Visualization"
          options={dynamicVisualOptions}
          selectedValue={data.visualKey}
          onChange={(visualKey) => setData({ ...data, visualKey, size: undefined })}
        />
        <Select
          gridAreaStyle="size"
          label="Size"
          options={dynamicSizeOptions}
          selectedValue={data.size}
          onChange={(size) => setData({ ...data, size })}
        />
      </form>
    </Modal>
  );
};
