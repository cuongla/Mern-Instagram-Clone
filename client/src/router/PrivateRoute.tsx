import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ ...props }) => {
    const isAuth = localStorage.getItem('auth');
    return isAuth ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRoute
