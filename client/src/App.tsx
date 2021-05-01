import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from 'store/actions/authActions';
import { RootState } from 'store';
import { getPosts } from 'store/actions/postActions';

// components
import MaintRouter from './MaintRouter';
import Home from 'pages/Home';
import Alert from 'components/alert';
import Header from 'components/header';
import Login from 'pages/Login';
import Register from 'pages/Register';
import StatusModal from 'components/home/Status/StatusModal';

// route
import PrivateRoute from 'router/PrivateRoute';


function App() {
  const { auth, status } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch]);

  useEffect(() => {
    auth.token && dispatch(getPosts(auth.token));
  }, [auth.token, dispatch]);

  return (
    <Router>
      <Alert />
      <input
        id="theme"
        type="checkbox" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
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
