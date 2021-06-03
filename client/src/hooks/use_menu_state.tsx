import { useState, useEffect } from 'react';

export default (defaultValue: boolean): [boolean, (boolean) => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  useEffect(() => {
    const onGlobalClick = () => setIsOpen(false);

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
