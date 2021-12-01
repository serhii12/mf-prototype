import React from 'react';
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import WhitelabelManager from '@core/managers/WhiteLabelManager';
import Example from '@core/screens/Example';

interface Props extends RouteComponentProps {}

const RouterManager = ({ location }: Props): JSX.Element => {
  return (
    <>
      <WhitelabelManager />
      <Switch>
        <Route exact path="/" component={Example} />
        <Redirect
          to={{
            pathname: '/',
            state: { from: location }
          }}
        />
      </Switch>
    </>
  );
};

export default withRouter(RouterManager);
