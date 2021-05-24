import React, { useState } from 'react';
import './Select.scss';

export interface SelectProps extends React.PropsWithChildren<any> {
  className?: string,
  defaultValue?: string,
  onChange?: (value: string) => void
}

export const Select = ({ className, children, defaultValue, onChange }: SelectProps) => {
  const [value, setValue] = useState(defaultValue);
  const [showing, setShowing] = useState(false);
  const items = children.slice();
  items.sort((x) => {
    return x.props.value === value ? -1 : 0;
  });
  return (
    <div className={`custom-select ${className}`}>
      <div className="select-box">
        <button className="select-selected" onClick={() => setShowing(!showing)}>
          {items[0].props.title || items[0].props.children}
        </button>
        {showing &&
          <div className="select-items">
            {items.map((item) => {
              return (
                <button onClick={() => {
                  setValue(item.props.value);
                  setShowing(false);
                  if (onChange) {
                    onChange(item.props.value);
                  }
                }}
                >
                  {item.props.children}
                </button>
              );
            })
            }
          </div>
        }
        <i className="material-icons-outlined">arrow_drop_down</i>
      </div>
    </div>
  );
};
