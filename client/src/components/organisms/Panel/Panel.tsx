import React, { useState } from 'react';
import _ from 'lodash';
import { Layout } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import 'react-grid-layout/css/styles.css';
import './Panel.scss';

import useMenuState from '../../../hooks/use_menu_state';
import { Card, CardData } from '../../molecules/Card/Card';
import { Menu } from '../../molecules/Menu/Menu';
import { MenuButton } from '../../molecules/MenuButton/MenuButton';
import { Modal } from '../../molecules/Modal/Modal';
import { ItemList } from '../../molecules/ItemList/ItemList';
import { Button } from '../../atoms/Button/Button';
import { Grid } from '../../molecules/Grid/Grid';

export interface PanelProps {
  cards: CardData[];
  title: string;
}

export const Panel: React.FC<PanelProps> = ({
  cards,
  title,
}: PanelProps) => {
  const [opened, setOpened] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useMenuState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gridIsDraggable, setGridIsDraggable] = useState(true);
  const [gridLayout, setGridLayout] = useState<Layout[]>([]);

  function setCardLayout(key, layout) {
    const keyString = String(key);
    const cardIndex = gridLayout.findIndex((l) => l.i === keyString);
    const cardLayout = { i: keyString, ...layout };

    if (!_.isEqual(gridLayout[cardIndex], cardLayout)) {
      const newLayout = _.cloneDeep(gridLayout);
      if (cardIndex !== -1) {
        newLayout[cardIndex] = cardLayout;
      } else {
        newLayout.push(cardLayout);
      }
      setGridLayout(newLayout);
    }
  }

  function renderListItem(card: CardData): React.ReactElement {
    return (
      <div className="manage-cards__list-item">
        <input defaultValue={`Item ${card.key}`} />
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

  function renderPanelModal() {
    const modalActionButtons = (
      <div>
        <Button buttonType="manage-cards__modal__button">
          <i className="material-icons">add</i>
          <span>New Card</span>
        </Button>
      </div>
    );

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
        <ItemList data={cards} renderItem={renderListItem} />
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
        <Grid layout={gridLayout} isDraggable={gridIsDraggable}>
          {cards.map((data) => (
            <div key={data.key}>
              <Card data={data} setGridIsDraggable={setGridIsDraggable} setCardLayout={setCardLayout} />
            </div>
          ))}
        </Grid>
      </div>
      {renderPanelModal()}
    </div>
  );
};

export default Panel;
