import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import Example from '@core/screens/Example';
import Login from '@core/screens/Login';

const RouterManager = (): JSX.Element => {
  return (
    <>
      <WhitelabelManager />
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default RouterManager;
