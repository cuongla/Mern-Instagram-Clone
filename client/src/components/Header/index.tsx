/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/actions/authActions';
import { navLinks } from './NavLinks';
import { THEME } from 'store/reducers/themeReducers';
import Avatar from 'components/Avatar';

const Header = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { auth, theme } = useSelector((state: RootState) => state);

    const changeMode = () => {
        return dispatch({
            type: THEME,
            payload: !theme
        })
    }

    const isActive = (pn: string) => {
        if (pn === pathname) return 'active';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
            <Link className="navbar-brand" to="/">
                InstaKram
            </Link>
            <div className="menu">
                <ul className="navbar-nav flex-row">
                    {
                        navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`nav-item px-2 ${isActive(link.path)}`}>
                                <Link
                                    to={link.path}
                                    className="nav-link">
                                    <span className="material-icons">
                                        {link.icon}
                                    </span>
                                </Link>
                            </li>
                        ))
                    }
                    <li className="nav-item dropdown">
                        <span
                            className="nav-link dropdown-toggle"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                                <Avatar 
                                    src={auth.user.avatar}
                                    theme={theme} />
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link
                                className="dropdown-item"
                                to={`/profile/${auth.user._id}`} >
                                Profile
                            </Link>
                            <label 
                                className="dropdown-item"
                                htmlFor="theme"
                                onClick={() => dispatch({
                                    type: THEME,
                                    payload: !theme
                                })}
                                >
                                { theme ? 'Light Mode' : 'Dark Mode' }
                            </label>
                            <div>
                                <hr className="dropdown-divider" />
                            </div>
                            <a
                                className="dropdown-item"
                                onClick={() => dispatch(logout())}
                                href="#">
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
function invert(arg0: number): import("csstype").Property.Filter | undefined {
    throw new Error('Function not implemented.');
}

