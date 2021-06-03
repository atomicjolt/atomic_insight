import React from 'react';
import './Select.scss';
import useMenuState from '../../../hooks/use_menu_state';

type OptionKey = number | string;

interface OptionType {
  key: OptionKey;
  title: string;
  subtitle?: string;
}

export interface SelectProps {
  options: OptionType[];
  selectedKey: OptionKey;
  onChange?: (OptionKey) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedKey,
  onChange,
  className = '',
}: SelectProps) => {
  const [active, setActive] = useMenuState(false);
  const selectedOption = options.find((o) => o.key === selectedKey);
  const sortedOptions = options.sort((o) => (o.key === selectedKey ? -1 : 1));

  function onOptionClick(optionKey: OptionKey): void {
    if (active) {
      onChange?.(optionKey);
    }
    setActive(!active);
  }

  return (
    <div className={`select ${className} ${active ? 'active' : ''}`}>
      <div className="select__placeholder">
        <h4>{selectedOption?.title ?? ''}</h4>
      </div>
      <div className="select__container">
        <div className="select__options-container">
          {sortedOptions.map(({ key, title, subtitle }) => {
            const isSelected = selectedKey === key;

            return (
              <button
                key={key}
                className={`select__option ${isSelected ? 'selected' : ''}`}
                onClick={() => onOptionClick(key)}
              >
                <h4 className="select__option__title">{title}</h4>
                <p className="select__option__subtitle">{subtitle}</p>
              </button>
            );
          })}
        </div>
        <i className="material-icons-outlined">arrow_drop_down</i>
      </div>
    </div>
  );
};
