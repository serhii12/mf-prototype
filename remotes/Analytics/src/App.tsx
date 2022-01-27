import React, { useLayoutEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';

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

  return (
    <Router
      basename="analytics"
      navigator={history}
      navigationType={state.action}
      location={state.location}
    >
      <Routes>
        <Route path="/" element={<h1>This is a Analytics Remote</h1>} />

        <Route path="*" element={<h1>404 Error</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
