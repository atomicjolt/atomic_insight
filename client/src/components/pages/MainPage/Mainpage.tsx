import React, { useEffect, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import './MainPage.scss';
import GridContainer from '../../organisms/GridContainer/GridContainer';
import { Card, Impact } from '../../molecules/Card/Card';
import { Menu } from '../../molecules/Menu/Menu';
import { Select } from '../../atoms/Select/Select';

export interface MainPageProps {
  title: string;
  layout?: [];
}

export const MainPage = ({ title }: MainPageProps) => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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

  function renderPageMenu() {
    return (
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
    );
  }

  return (
    <div className="mainpage">
      <div className="mainpage-header">
        <div className="header-left">
          <h1>{title}</h1>
          <p>Week 3 of 11</p>
        </div>
        <div className="header-right">
          <div className="select-comparison">
            <h3 className="comparison-label">Comparison:</h3>
            <Select id="comparison" defaultValue="Weekly">
              <option value="weekly" title="Weekly">
                <b>Weekly</b>
                <div>Other weeks of this course</div>
              </option>
              <option value="classes" title="My Classes">
                <b>My Classes</b>
                <div>Other classes I've taught</div>
              </option>
              <option value="department" title="Department">
                <b>Department</b>
                <div>Other courses in this department</div>
              </option>
            </Select>
          </div>
          <button className="more-button">
            <i className="material-icons-outlined">email</i>
          </button>
          <button className="more-button" onClick={() => setMenuIsOpen(true)}>
            <i className="material-icons-outlined">more_vert</i>
            {renderPageMenu()}
          </button>
        </div>
      </div>
      <GridContainer title="Pinned">
        <div key={1}>
          <Card title="Card1" impact={Impact.High} pinned={false}>
            CardContents
          </Card>
        </div>
        <div key={2}>
          <Card title="Card2" impact={Impact.Low} pinned={false}>
            CardContents
          </Card>
        </div>
        <div key={3}>
          <Card title="Card3" impact={Impact.High} pinned={false}>
            CardContents
          </Card>
        </div>
        <div key={4}>
          <Card title="Card4" impact={Impact.Low} pinned={false}>
            CardContents
          </Card>
        </div>
      </GridContainer>
    </div>
  );
};

export default MainPage;
