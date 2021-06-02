import React from 'react';
import './styles/base.scss';

import MainPage from './components/pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <MainPage title="Course Diagnostics" />
  );
};

export default App;
