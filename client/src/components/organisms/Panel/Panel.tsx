import React, { useState } from 'react';
import { Layout } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import 'react-grid-layout/css/styles.css';
import './Panel.scss';

import useMenuState from '../../../hooks/use_menu_state';
import { Menu } from '../../molecules/Menu/Menu';
import { MenuButton } from '../../molecules/MenuButton/MenuButton';
import { Modal } from '../../molecules/Modal/Modal';
import { ItemList } from '../../molecules/ItemList/ItemList';
import { Button } from '../../atoms/Button/Button';
import { Grid } from '../../molecules/Grid/Grid';

interface PanelChildType {
  key: number | string;
  element: React.ReactElement;
}

export interface PanelProps {
  items: PanelChildType[];
  title: string;
  layout: Layout[];
}

export const Panel: React.FC<PanelProps> = ({
  items,
  title,
  layout = [],
}: PanelProps) => {
  const [opened, setOpened] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useMenuState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function renderPanelModal() {
    const modalActionButtons = (
      <div>
        <Button buttonType="manage-cards__modal__button">
          <i className="material-icons">add</i>
          <span>New Card</span>
        </Button>
      </div>
    );

    const listData = items.map((item) => ({
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
          className="panel__header__button"
          onClick={() => setOpened(opened === 'close' ? 'open' : 'close')}
        >
          <FontAwesomeIcon icon={faCaretDown} />
          {title}
        </button>
        <MenuButton>
          <button
            className="panel__header__button"
            onClick={() => (menuIsOpen ? null : setMenuIsOpen(true))}
          >
            <i className="material-icons-outlined">edit</i>
          </button>
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
        </MenuButton>
      </div>
      <div className="panel__content">
        <Grid layout={layout}>{items.map(({ element }) => element)}</Grid>
      </div>
      {renderPanelModal()}
    </div>
  );
};

export default Panel;
