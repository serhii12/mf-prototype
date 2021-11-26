import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import Example from '@core/screens/Example';

const RouterManager = ({ location }) => {
  return (
    <>
      <WhitelabelManager />
      <Switch>
        <Route exact path="/" component={Example} />
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      </Switch>
    </>
  );
};

RouterManager.defaultProps = {
  location: {},
};

RouterManager.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]),
};

export default withRouter(RouterManager);
