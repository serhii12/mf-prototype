import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import Example from '@core/screens/Example';

const RouterManager = (): JSX.Element => {
  return (
    <>
      <WhitelabelManager />
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
    </>
  );
};

export default RouterManager;
