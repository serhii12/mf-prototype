import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '@core/redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RouterManager from '@core/managers/RouterManager';

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <RouterManager />
      </BrowserRouter>
    </Provider>
  </PersistGate>,
  document.querySelector('#root')
);
