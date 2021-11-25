import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<h1>This is a new Remote</h1>, el);
};

// We are running through container
// and we should export the mount function
export { mount };
