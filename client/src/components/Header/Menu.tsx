/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/actions/authActions';
import { navLinks } from './NavLinks';
import Avatar from 'components/reusable/Avatar';
import { global_types } from 'store/types/globalTypes';


const Menu: React.FC = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { auth, theme } = useSelector((state: RootState) => state);

    const changeMode = () => {
        return dispatch({
            type: global_types.THEME,
            payload: !theme
        })
    }
    const isActive = (pn: string) => {
        if (pn === pathname) return 'active';
    }

    return (
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
                            theme={theme}
                            size="medium-avatar" />
                    </span>
                    <div 
                        className="dropdown-menu" 
                        aria-labelledby="navbarDropdown">
                        <Link
                            className="dropdown-item"
                            to={`/profile/${auth.user._id}`} >
                            Profile
                            </Link>
                        <label
                            className="dropdown-item"
                            htmlFor="theme"
                            onClick={changeMode}
                        >
                            {theme ? 'Light Mode' : 'Dark Mode'}
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
    )
}

export default Menu
