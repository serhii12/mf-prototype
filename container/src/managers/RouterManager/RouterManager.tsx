import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import Login from '@core/screens/Login';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@core/redux/selectors/auth.selectors';

/**
 * Private route is used to redirect user to login page if not authenticated
 * @param children
 * @return JSXElement
 */
const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const userAuthenticated: boolean = useSelector(isLoggedIn);
  const location = useLocation();

  if (userAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

const RouterManager = (): JSX.Element => {
  return (
    <>
      <WhitelabelManager />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />

        {/* PRIVATE ROUTERS */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default RouterManager;
