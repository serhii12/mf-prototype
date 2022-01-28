import React, { useLayoutEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { NotificationStore } from '@gourban/ui-components';

interface AppProps {
  history: any;
  messagingService: any;
}

const App: React.FC<AppProps> = ({ history }) => {
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, []);

  const triggerNotification = () => {
    NotificationStore.addNotification({ content: 'Test', title: 'Success', type: 'info' });
  };

  return (
    <Router
      basename="analytics"
      navigator={history}
      navigationType={state.action}
      location={state.location}
    >
      <Routes>
        <Route
          path="/"
          element={
            <h1>
              This is a Analytics Remote{' '}
              <button onClick={triggerNotification}>Trigger notification</button>
            </h1>
          }
        />

        <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
