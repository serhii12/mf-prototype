import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@core/redux/selectors/auth.selectors';
import routes from '@core/managers/RouterManager/routes';
import Layout from '@core/components/Layout';

/**
 * Auth guard is used to redirect user to login page if not authenticated
 * @param children
 * @return JSXElement
 */
const AuthGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
  const userAuthenticated: boolean = useSelector(isLoggedIn);
  const location = useLocation();

  if (userAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

const RouterManager = (): JSX.Element => {
  const userAuthenticated: boolean = useSelector(isLoggedIn);

  return (
    <>
      <WhitelabelManager />
      <Routes>
        {/* PUBLIC ROUTES */}
        {routes
          .filter((route) => !route?.guarded)
          .map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={
                !route.availableOnAuth && userAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <route.element />
                )
              }
            />
          ))}

        {/* PRIVATE ROUTES */}
        <Route path="/" element={<Layout />}>
          {routes
            .filter((route) => !!route?.guarded && !route.isRemote)
            .map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <AuthGuard>
                    <route.element />
                  </AuthGuard>
                }
              />
            ))}
        </Route>

        {/* REMOTE ROUTES */}
        {routes
          .filter((route) => !!route?.guarded && !!route?.isRemote)
          .map((route) => (
            <Route path={route.path} key={route.path} element={<Layout />}>
              <Route
                index
                element={
                  <AuthGuard>
                    <route.element />
                  </AuthGuard>
                }
              />

              <Route
                path="*"
                element={
                  <AuthGuard>
                    <route.element />
                  </AuthGuard>
                }
              />
            </Route>
          ))}

        <Route path="*" element={<h1>404 Error!</h1>} />
      </Routes>
    </>
  );
};

export default RouterManager;
