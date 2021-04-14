import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MaintRouter from './MaintRouter';


function App() {
  return (
    <Router>
      <input
        id="theme"
        type="checkbox" />
      <div className="App">
        <div className="main">
          <Route
            path="/:page"
            component={MaintRouter} />
          <Route
            path="/:page/:id"
            component={MaintRouter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
