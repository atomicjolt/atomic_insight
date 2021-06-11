import React, { useState, useEffect } from 'react';

export default (
  defaultValue: boolean,
  ref?: React.RefObject<HTMLDivElement>
): [boolean, (boolean
) => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  useEffect(() => {
    const onGlobalClick = (event) => {
      if (ref?.current) {
        if (!ref?.current.contains(event.target)) {
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
