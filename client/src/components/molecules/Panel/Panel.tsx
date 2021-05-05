import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import 'react-grid-layout/css/styles.css';
import './Panel.scss';

import { Menu } from '../Menu/Menu';
import { Modal } from '../Modal/Modal';
import { ItemList } from '../ItemList/ItemList';
import { Button } from '../../atoms/Button/Button';


export interface ButtonProps extends React.PropsWithChildren<any> {
  title: string;
}

export const Panel = ({ children, title }: ButtonProps) => {
  const [opened, setOpened] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    function onDocumentClick() {
      if (menuIsOpen) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [menuIsOpen]);

  function renderPanelMenu() {
    return (
      <Menu isOpen={menuIsOpen}>
        <li>
          <button onClick={() => setModalIsOpen(true)}>
            <i className="material-icons-outlined">more_horiz</i>
            <span>Manage Cards</span>
          </button>
        </li>
        <li>
          <button>
            <i className="material-icons-outlined">swap_vert</i>
            <span>Sort</span>
          </button>
        </li>
        <li>
          <button>
            <i className="material-icons-outlined">visibility_off</i>
            <span>Hide</span>
          </button>
        </li>
        <li>
          <button>
            <i className="material-icons-outlined">delete</i>
            <span>Delete</span>
          </button>
        </li>
      </Menu>
    );
  }

  function renderPanelModal() {
    const modalActionButtons = (
      <div>
        <Button className="manage-cards__modal__button">
          <i className="material-icons">add</i>
          <span>New Card</span>
        </Button>
      </div>
    );

    const listData = React.Children.map(children, (item) => ({
      key: item.key,
      name: `Item ${item.key}`,
    }));

    function renderListItem(item) {
      return (
        <div className="manage-cards__list-item">
          <input defaultValue={item.name} />
          <div>
            <button>
              <i className="material-icons-outlined">edit</i>
            </button>
            <button>
              <i className="material-icons-outlined">visibility_off</i>
            </button>
            <button>
              <i className="material-icons-outlined">delete</i>
            </button>
            <button className="draggable-handle">
              <i className="material-icons-outlined">drag_handle</i>
            </button>
          </div>
        </div>
      );
    }

    return (
      <Modal
        className="manage-cards__modal"
        title="Manage Cards"
        isOpen={modalIsOpen}
        actionButtons={modalActionButtons}
        cancelButtonClassName="manage-cards__modal__button"
        onSave={() => setModalIsOpen(false)}
        onCancel={() => setModalIsOpen(false)}
      >
        <ItemList data={listData} renderItem={renderListItem} />
      </Modal>
    );
  }

  return (
    <div className={`panel ${opened}`}>
      <div className="panel__header">
        <button
          onClick={() => setOpened(opened === 'close' ? 'open' : 'close')}
        >
          <FontAwesomeIcon icon={faCaretDown} />
          {title}
        </button>
        <button onClick={() => (menuIsOpen ? null : setMenuIsOpen(true))}>
          <i className="material-icons-outlined">edit</i>
        </button>
      </div>
      <div className="panel__content">
        <div>
          {children}
        </div>
      </div>
      {renderPanelMenu()}
      {renderPanelModal()}
    </div>
  );
};

export default Panel;
