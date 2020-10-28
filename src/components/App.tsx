import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ROUTES } from 'constants/Routes';
import 'styles/App.scss';

function App() {
  return (
    <Router>
      <Switch>
        {ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
