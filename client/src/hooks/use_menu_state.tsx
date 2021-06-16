import React, { useState, useEffect } from 'react';

type IsOpenType = boolean;
type SetIsOpenType = (boolean) => void;

export default (
  defaultValue: boolean,
  menuRef?: React.RefObject<HTMLDivElement>
): [IsOpenType, SetIsOpenType] => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  useEffect(() => {
    const onGlobalClick = (event) => {
      if (menuRef?.current) {
        if (!menuRef?.current.contains(event.target)) {
          setIsOpen(false);
        }
      } else {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onGlobalClick);
    } else {
      window.removeEventListener('click', onGlobalClick);
    }
    return () => {
      window.removeEventListener('click', onGlobalClick);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen];
};
