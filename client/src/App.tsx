import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from 'store/actions/authActions';

// components
import MaintRouter from './MaintRouter';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Alert from 'components/Alert';
import { RootState } from 'store';

function App() {
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input
        id="theme"
        type="checkbox" />
      <div className="App">
        <div className="main">
          <Route 
            exact 
            path="/"
            component={auth.token ? Home : Login} />
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
