import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@core/redux/selectors/auth.selectors';
import routes from '@core/managers/RouterManager/routes';
import Layout from '@core/components/Layout';

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
        {routes
          .filter((route) => !route?.private)
          .map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}

        {/* PRIVATE ROUTERS */}
        <Route path="/" element={<Layout />}>
          {routes
            .filter((route) => !!route?.private)
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.element />
                  </PrivateRoute>
                }
              />
            ))}
        </Route>
      </Routes>
    </>
  );
};

export default RouterManager;
