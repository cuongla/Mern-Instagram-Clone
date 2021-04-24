import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from 'store/actions/authActions';
import { RootState } from 'store';

// components
import MaintRouter from './MaintRouter';
import Home from 'pages/Home';
import Alert from 'components/Alert';
import Header from 'components/Header';
import Login from 'pages/Login';
import Register from 'pages/Register';

// route
import PrivateRoute from 'router/PrivateRoute';


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
          {auth.token && <Header />}
          <Route
            exact
            path="/"
            component={auth.token ? Home : Login} />
          <Route
            exact
            path="/register"
            component={Register} />
          <PrivateRoute
            exact
            path="/:page"
            component={MaintRouter} />
          <PrivateRoute
            exact 
            path="/:page/:id"
            component={MaintRouter} />
        </div>
      </div>
    </Router>
  );
}

export default App;
