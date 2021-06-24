import React, { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import './MainPage.scss';

import useMenuState from '../../../hooks/use_menu_state';

import { CardDisplay, CardSize } from '../../../common/constants/card';
import { MetricKey } from '../../../common/constants/metric';
import { VisualKey } from '../../../common/constants/visual';

import { Panel } from '../../organisms/Panel/Panel';
import { Menu } from '../../molecules/Menu/Menu';
import { CardData } from '../../molecules/Card/Card';
import { Button } from '../../atoms/Button/Button';
import { Label, LabelDisplay } from '../../atoms/Label/Label';
import { MenuButton } from '../../molecules/MenuButton/MenuButton';
import { Select } from '../../atoms/Select/Select';

enum ComparisonOption {
  Weekly,
  Classes,
  Department,
}

const comparisonOptions = [
  {
    value: ComparisonOption.Weekly,
    title: 'Weekly',
    subtitle: 'Other weeks of this course',
  },
  {
    value: ComparisonOption.Classes,
    title: 'Classes',
    subtitle: 'Other classes I’ve taught',
  },
  {
    value: ComparisonOption.Department,
    title: 'Department',
    subtitle: 'Other courses in this department',
  },
];

export interface MainPageProps {
  title: string;
}

export const MainPage: React.FC<MainPageProps> = ({ title }: MainPageProps) => {
  const [menuIsOpen, setMenuIsOpen] = useMenuState(false);
  const [selectedComparison, setSelectedComparison] = useState(
    ComparisonOption.Weekly
  );

  const cards: CardData[] = [{
    key: 1,
    position: { x:0, y: 0 },
    metricKey: MetricKey.DiscussionPosts,
    visualKey: VisualKey.Icon,
  }, {
    key: 2,
    position: { x:1, y: 0 },
    metricKey: MetricKey.DiscussionPosts,
    visualKey: VisualKey.Icon,
    size: CardSize.Half,
  }, {
    key: 3,
    position: { x:1, y: 1 },
    metricKey: MetricKey.DiscussionPosts,
    visualKey: VisualKey.Icon,
    size: CardSize.Half,
    display: CardDisplay.Comparison,
  }, {
    key: 4,
    position: { x:2, y: 0 },
    metricKey: MetricKey.DiscussionPosts,
    visualKey: VisualKey.Icon,
    display: CardDisplay.Comparison,
  }];

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
              selectedValue={selectedComparison}
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
      <Panel title="Pinned" cards={cards} />
    </div>
  );
};

export default MainPage;
