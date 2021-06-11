import React, { useRef, useState, useEffect } from 'react';

import './Select.scss';
import useMenuState from '../../../hooks/use_menu_state';
import { Label } from '../Label/Label';

export type OptionKey = number | string | React.FC;

export interface OptionType {
  key: OptionKey;
  title: string;
  subtitle?: string;
}

export interface SelectProps {
  options: OptionType[];
  selectedKey?: OptionKey;
  onChange?: (OptionKey) => void;
  label?: string;
  searchable?: boolean;
  gridArea?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedKey,
  onChange = () => null,
  label,
  searchable = false,
  gridArea,
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.key === selectedKey);

  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useMenuState(false, selectRef);

  const sortedOptions = searchable
    ? options
      .filter((option) =>
        option.title.toLowerCase().includes(inputValue.toLowerCase()))
      .sort(
        (a, b) => a.title.indexOf(inputValue) - b.title.indexOf(inputValue)
      )
    : options.sort((option) => (option.key === selectedKey ? -1 : 1));

  useEffect(() => {
    setInputValue(selectedOption?.title ?? '');
  }, [selectedOption]);

  useEffect(() => {
    if (!active && inputValue !== selectedOption?.title) {
      setInputValue(selectedOption?.title ?? '');
    }

    const optionsContainer = selectRef?.current?.querySelector('.select__options-container');
    if (active && optionsContainer?.scrollTop !== 0) {
      optionsContainer?.scroll(0, 0);
    }
  }, [active]);

  function onTabOption(): void {
    const isFocused = selectRef?.current?.contains(document.activeElement);
    if (!isFocused) {
      setActive(false);
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent): void {
    if (!active && e.key !== 'Tab') {
      setActive(true);
      if (e.key === 'Enter') {
        setInputValue('');
      }
    }
  }

  function onInputClick(): void {
    setActive(true);
    setInputValue('');
  }

  function onOptionClick(option: OptionType): void {
    if (active) {
      onChange(option.key);
      setActive(false);
    } else {
      setActive(true);
    }
  }

  let elem = (
    <div
      ref={selectRef}
      className={`select ${active ? 'active' : ''} ${
        searchable ? 'searchable' : ''
      }`}
      onBlur={() => active ? setTimeout(onTabOption, 1) : null}
    >
      <div className="select__placeholder">
        <h4>{selectedOption?.title ?? ''}&nbsp;</h4>
      </div>
      <div className="select__container">
        <div>
          {searchable ? (
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="select__input"
              type="text"
              tabIndex={0}
              onKeyDown={onInputKeyDown}
              onClick={onInputClick}
            />
          ) : null}
          <div className="select__options-container">
            {sortedOptions.map((option) => {
              const { key, title, subtitle } = option;
              const isSelected = selectedKey === key;

              return (
                <button
                  key={`option-${title}`}
                  tabIndex={isSelected || active ? 0 : -1}
                  type="button"
                  className={`select__option ${isSelected ? 'selected' : ''} ${
                    subtitle ? '' : 'no-subtitle'
                  }`}
                  onClick={() => onOptionClick(option)}
                >
                  <h4 className="select__option__title">{title}</h4>
                  <p className="select__option__subtitle">{subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
        <i className="material-icons-outlined">
          {searchable ? 'search' : 'arrow_drop_down'}
        </i>
      </div>
    </div>
  );

  if (label) {
    elem = <Label title={label}>{elem}</Label>;
  }

  if (gridArea) {
    elem = <div style={{ gridArea }}>{elem}</div>;
  }

  return elem;
};
