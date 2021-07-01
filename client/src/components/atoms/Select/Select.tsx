import React, { useRef, useState, useEffect, useMemo } from 'react';

import './Select.scss';
import useMenuState from '../../../hooks/use_menu_state';
import { Label } from '../Label/Label';

export interface OptionType<ValueType> {
  value: ValueType;
  title: string;
  subtitle?: string;
}

export interface SelectProps<ValueType> {
  options: OptionType<ValueType>[];
  selectedValue?: ValueType;
  onChange?: (OptionValue) => void;
  label?: string;
  searchable?: boolean;
  gridAreaStyle?: string;
}

export const Select = <ValueType, >({
  options = [],
  selectedValue,
  onChange = () => {},
  label,
  searchable = false,
  gridAreaStyle,
}: SelectProps<ValueType>): React.ReactElement<SelectProps<ValueType>> => {
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === selectedValue);

  const isValid = options.length > 0;

  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useMenuState(false, selectRef);

  const sortedOptions = useMemo(() => {
    if (searchable) {
      return options
        .filter((option) =>
          option.title.toLowerCase().includes(inputValue.toLowerCase()))
        .sort(
          (a, b) => a.title.indexOf(inputValue) - b.title.indexOf(inputValue)
        );
    }
    return options.sort((option) => (option.value === selectedValue ? -1 : 1));
  }, [inputValue, options, searchable]);

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

  function onOptionClick(option: OptionType<ValueType>): void {
    if (active) {
      onChange(option.value);
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
      } ${isValid ? '' : 'disabled'}`}
    >
      <div className="select__placeholder">
        <h4>&nbsp;</h4>
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
          <div className="select__options-container" onBlur={() => active ? setTimeout(onTabOption, 1) : null}>
            {sortedOptions.map((option) => {
              const { value, title, subtitle } = option;
              const isSelected = selectedValue === value;

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

  if (label !== undefined) {
    elem = <Label title={label}>{elem}</Label>;
  }

  if (gridAreaStyle !== undefined) {
    elem = <div style={{ gridArea: gridAreaStyle }}>{elem}</div>;
  }

  return elem;
};
