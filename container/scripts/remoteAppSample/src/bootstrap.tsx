import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, Listener } from 'history';
// @ts-ignore
import App from './App';

interface MessagingService {
  subscribe: Function;
  sendMessageToHost: Function;
}

interface MountProps {
  el: HTMLElement;
  messagingService: MessagingService;
  onNavigate: Listener;
  initialPath: string;
}

// Mount function to start up the app
const mount = ({ el, messagingService, onNavigate, initialPath }: MountProps) => {
  if (messagingService) {
    // When mount is called subscribe to container via messagingService if provided
    // This enables the communication between Container and Microfrontend
    messagingService.subscribe((receivedData) => console.info(receivedData));
  }

  // Container app is using BrowserHistory, remote apps need to use memoryHistory
  const history = createMemoryHistory({ initialEntries: [initialPath] });

  // Listen to change in navigation directed by remote app and update container app
  // This is done to keep container app up to date on current link active
  history.listen(onNavigate);

  ReactDOM.render(<App history={history} messagingService={messagingService} />, el);
};

// We are running through container
// and we should export the mount function
export { mount };
