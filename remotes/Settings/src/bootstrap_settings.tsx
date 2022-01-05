import React from 'react';
import ReactDOM from 'react-dom';

interface MessengingService {
  subscribe: Function;
  sendMessageToHost: Function;
}

// Mount function to start up the app
const mount = (el: any, messengingService: MessengingService) => {
  if (messengingService) {
    messengingService.subscribe((receivedData) => console.info(receivedData));
  }

  const sendMessageToHost = () => {
    messengingService.sendMessageToHost('Something should change after this.');
  };

  ReactDOM.render(
    <h1>
      This is a new Remote{' '}
      <button onClick={sendMessageToHost}>Click here to send message to host!</button>
    </h1>,
    el
  );
};

// We are running through container
// and we should export the mount function
export { mount };
