import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '@core/redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RouterManager from '@core/managers/RouterManager/RouterManager';
import '@core/assets/scss/index.scss';

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <RouterManager />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
