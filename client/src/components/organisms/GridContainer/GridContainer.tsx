import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import 'react-grid-layout/css/styles.css';
import './GridContainer.scss';

import { Menu } from '../../molecules/Menu/Menu';
import { Modal } from '../../molecules/Modal/Modal';
import { ItemList } from '../../molecules/ItemList/ItemList';
import { Button } from '../../atoms/Button/Button';

const GridLayout = WidthProvider(Responsive);

export interface ButtonProps extends React.PropsWithChildren<any> {
  title: string;
}

export const GridContainer = ({ children, title }: ButtonProps) => {
  const [rowHeight, setRowHeight] = useState(10);
  const [opened, setOpened] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const tileRatio = 4 / 5; // Ratio of height / width

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

    const listData = children.map((item) => ({
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
    <div className={`grid-container ${opened}`}>
      <div className="grid-container__header">
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
      <div className="grid-container__content">
        <GridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
          rowHeight={rowHeight}
          isResizable={false}
          margin={[15, 15]}
          containerPadding={[20, 20]}
          onWidthChange={(width, margin, cols, padding) => {
            // Calculates tile height by subtracting margins and paddings from the width of container divided by columns
            const tileHeight = (width - margin[0] - padding[0] * cols) / cols;
            setRowHeight(tileHeight * tileRatio);
          }}
          children={children}
        />
      </div>
      {renderPanelMenu()}
      {renderPanelModal()}
    </div>
  );
};

export default GridContainer;
