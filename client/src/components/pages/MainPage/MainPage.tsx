import React, { useState } from 'react';
import { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './MainPage.scss';

import useMenuState from '../../../hooks/use_menu_state';
import { CardDisplay, CardSize } from '../../../common/constants';

import { Panel } from '../../organisms/Panel/Panel';
import { Menu } from '../../molecules/Menu/Menu';
import { Button } from '../../atoms/Button/Button';
import { Label, LabelDisplay } from '../../atoms/Label/Label';
import { MenuButton } from '../../molecules/MenuButton/MenuButton';
import { IconVisual } from '../../molecules/IconVisual/IconVisual';
import { Select } from '../../atoms/Select/Select';

enum ComparisonOption {
  Weekly,
  Classes,
  Department,
}

const comparisonOptions = [
  {
    key: ComparisonOption.Weekly,
    title: 'Weekly',
    subtitle: 'Other weeks of this course',
  },
  {
    key: ComparisonOption.Classes,
    title: 'Classes',
    subtitle: 'Other classes I’ve taught',
  },
  {
    key: ComparisonOption.Department,
    title: 'Department',
    subtitle: 'Other courses in this department',
  },
];

const layout: Layout[] = [
  { i: '1', x: 0, y: 0, w: 1, h: 2 },
  { i: '2', x: 1, y: 0, w: 1, h: 1 },
  { i: '3', x: 1, y: 0, w: 1, h: 1 },
  { i: '4', x: 2, y: 0, w: 1, h: 2 },
];

// const data = {
//   value: 12,
//   comparisonValue: 1.08,
// };

const cards = [{
  key: 1,
  title: 'Discussion Posts',
  visual: IconVisual,
}, {
  key: 2,
  title: 'Discussion Posts',
  visual: IconVisual,
  size: CardSize.Half,
}, {
  key: 3,
  title: 'Discussion Posts',
  visual: IconVisual,
  size: CardSize.Half,
  display: CardDisplay.Comparison,
}, {
  key: 4,
  title: 'Discussion Posts',
  display: CardDisplay.Comparison
}];


export interface MainPageProps {
  title: string;
  layout?: [];
}

export const MainPage: React.FC<MainPageProps> = ({ title }: MainPageProps) => {
  const [menuIsOpen, setMenuIsOpen] = useMenuState(false);
  const [selectedComparison, setSelectedComparison] = useState(
    ComparisonOption.Weekly
  );

  return (
    <div className="main-page">
      <div className="main-page__header">
        <div>
          <h1>{title}</h1>
          <p>Week 3 of 11</p>
        </div>
        <div>
          <Label title="Comparison:" display={LabelDisplay.Inline} >
            <Select
              selectedKey={selectedComparison}
              onChange={setSelectedComparison}
              options={comparisonOptions}
            />
          </Label>
          <Button buttonType="btn--icon btn--border btn--white">
            <i className="material-icons-outlined">email</i>
          </Button>
          <MenuButton>
            <Button
              buttonType="btn--icon btn--border btn--white"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              <i className="material-icons-outlined">more_vert</i>
            </Button>
            <Menu isOpen={menuIsOpen}>
              <li>
                <button>
                  <i className="material-icons-outlined">more_horiz</i>
                  <span>Manage Panels</span>
                </button>
              </li>
              <li>
                <button>
                  <i className="material-icons-outlined">settings</i>
                  <span>Admin Settings</span>
                </button>
              </li>
              <li>
                <button>
                  <i className="material-icons-outlined">settings</i>
                  <span>Course Settings</span>
                </button>
              </li>
            </Menu>
          </MenuButton>
        </div>
      </div>
      <Panel title="Pinned" layout={layout} cards={cards} />
    </div>
  );
};

export default MainPage;
